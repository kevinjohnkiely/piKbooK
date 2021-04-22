import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./auth.module.css";
import { useAuth } from "../../context/authContext";
import { storage } from "../../firebase";
import firebase from "../../firebase";

const ChangePicture = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [ loadedUserId, setLoadedUserId ] = useState([])
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [postsByUser, setPostsByUser] = useState([])

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("users").where("userId", "==", currentUser.uid).onSnapshot((snapshot) => {
      const userDocId = [];
      snapshot.forEach((doc) => userDocId.push(doc.id));
      setLoadedUserId(userDocId)
      
    });
  },[currentUser.uid])

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("posts").where("userId", "==", currentUser.uid).onSnapshot((snapshot) => {
      const loadedPosts = [];
      snapshot.forEach((doc) => loadedPosts.push({...doc.data(), id: doc.id }));
      setPostsByUser(loadedPosts)
      
    });
  },[currentUser.uid])

  const handlePicChange = (event) => {
    if (event.target.files[0]) {
      console.log(event.target.files[0].type);
      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png"
      ) {
        setImage(event.target.files[0]);
      } else {
        setLoading(true);
        setError("Please add image of type png/jpg!");
      }
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        setError("Error with image upload, please try again!");
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            
            // change pic in users table
            const db = firebase.firestore();
            db.collection("users").doc(loadedUserId.toString()).update({ profilePic: url })

            // change pic in posts table for each post by user
            postsByUser.forEach(post => {
              db.collection("posts").doc(post.id).update({ profilePic: url })
            })

            setLoading(false);
            setSuccess(true);
          });
      }
    );
    
  };

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>Change Your Photo!</h2>
        {error && <p className={classes.errorMsg}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={classes.formControl}>
            <label>Add a profile photo (MUST BE JPEG OR PNG!): </label>
            <input
              type="file"
              name="image"
              required
              onChange={handlePicChange}
            />
            <progress value={progress} max="100" style={{ width: "100%" }} />
          </div>

          <button type="submit" disabled={loading} className={classes.btn}>
            Change Photo
          </button>
          { success && <div className={classes.imageUploaded}>
            <h3>Success! Here is your new profile photo!</h3>
            <img src={url} alt={url} />
            
            <Link to="/home" className={classes.btn}>Go to timeline of posts</Link>
          </div>}
          
        </form>
        <article className={classes.footer}>
          <p>
            Return to Account Page? <Link to="/dashboard">Cancel</Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default ChangePicture;
