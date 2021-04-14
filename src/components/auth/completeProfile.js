import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./auth.module.css";
import { useAuth } from "../../context/authContext";
import { storage } from "../../firebase";
import firebase from "../../firebase";

const CompleteProfile = () => {
  const usernameRef = useRef();
  const locationRef = useRef();
  const { currentUser } = useAuth();

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

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
    setLocation(locationRef.current.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.totalBytes);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setError("Error with image upload, please try again!");
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            setUrl(url);
            // write userId, username, location, imageUrl to the database

            const newDetails = {
              userId: currentUser.uid,
              username: username,
              location: location,
              profilePic: url,
            };

            const db = firebase.firestore();
            db.collection("users").add(newDetails);
            setLoading(false);
            setSuccess(true);

            // console.log(currentUser.uid);
            // setLoading(false)
          });
      }
    );
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
              value={location}
              required
              ref={locationRef}
              onChange={handleChange}
            />
          </div>
          <div className={classes.formControl}>
            <label>Add a profile photo: </label>
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
          <img src={url} />
        </form>
      </div>
    </section>
  );
};

export default CompleteProfile;
