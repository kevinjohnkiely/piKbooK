import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./auth.module.css";
import { useAuth } from "../../context/authContext";
import { storage } from "../../firebase";
import firebase from "../../firebase";

const CompleteProfile = () => {
  const usernameRef = useRef();
  const yourLocationRef = useRef();
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [yourLocation, setYourLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [ loadedUsernames, setLoadedUsernames ] = useState([])
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => users.push(doc.data().username.toLowerCase()));
      setLoadedUsernames(users)
    });
  },[])

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

  const handleChange = () => {
    setUsername(usernameRef.current.value);
    setYourLocation(yourLocationRef.current.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(loadedUsernames.includes(username)) {
      setError('That username is already taken! Please choose another.')
    } else {
      setLoading(true);

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
            
            const newDetails = {
              userId: currentUser.uid,
              username: username,
              location: yourLocation,
              profilePic: url,
            };

            const db = firebase.firestore();
            db.collection("users").add(newDetails);
            setLoading(false);
            setSuccess(true);
          });
      }
    );
    }
    
    
  };

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>Complete Your Profile!</h2>
        {error && <p className={classes.errorMsg}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={classes.formControl}>
            <input
              type="text"
              name="email"
              placeholder="Choose a username"
              value={username}
              required
              ref={usernameRef}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <input
              type="text"
              name="location"
              placeholder="Your Location?"
              value={yourLocation}
              required
              ref={yourLocationRef}
              onChange={handleChange}
            />
          </div>
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
            Complete Profile
          </button>
          { success && <div className={classes.imageUploaded}>
            <h3>Account created! Here is your profile photo!</h3>
            <img src={url} alt={url}/>
            <Link to="/home">Go to timeline of posts</Link>
          </div>}
          
        </form>
      </div>
    </section>
  );
};

export default CompleteProfile;
