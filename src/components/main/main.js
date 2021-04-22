import React, { useState, useEffect } from "react";
import classes from "./main.module.css";
import Sidebar from "./sidebar/sidebar";
import Timeline from "./timeline/timeline";
import AlertModal from "../alertModal/alertModal";
import Spinner from "../spinner/spinner";
import firebase from "../../firebase";
import moment from 'moment'

import { useAuth } from '../../context/authContext'

function Main() {
  
  console.log('Rendering....MAIN');
  console.log('------------------');

  const { currentUser } = useAuth()

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [ loadedUserDetails, setLoadedUserDetails] = useState({})

  // Get the logged in users details
  useEffect(() => {
    if(currentUser) {
      setLoadingUser(true)
        const db = firebase.firestore();
        db.collection('users').where("userId", "==", currentUser.uid).get()
            .then(data => {
                data.forEach(doc => {
                    setLoadedUserDetails(doc.data())
                })
                setLoadingUser(false)
            });
    }
  },[currentUser])
 
  const addComment = (comment) => {
    setLoading(true);
    const newPost = {
      comment,
      user: loadedUserDetails.username,
      userId: loadedUserDetails.userId,
      profilePic: loadedUserDetails.profilePic,
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    const db = firebase.firestore();
    db.collection("posts").add(newPost);
    setLoading(false);
    setSuccess(true);
  };

  const clearErrorMessage = () => {
    setError(false);
  };

  const clearSuccessMessage = () => {
    setSuccess(false);
  };

  let spinnerOrSidebar = (
    <Sidebar 
      addComment={(comment) => addComment(comment)} 
      loadedUserDetails={loadedUserDetails} />
  )

  if (loadingUser) {
    spinnerOrSidebar = <Spinner />
  }

  return (
    <section className="container">
      {error ? (
        <AlertModal
          message="Network error! Please check your connection!"
          type="failure"
          clicked={clearErrorMessage}
        />
      ) : null}
      {success ? (
        <AlertModal
          message="Post was submitted! Thank you :)"
          type="success"
          clicked={clearSuccessMessage}
        />
      ) : null}
      <div className={classes.gridLayoutMain}>
        {spinnerOrSidebar}
        <Timeline 
          loadedUserDetails={loadedUserDetails} 
        />
        
      </div>
    </section>
    
  );
}

export default Main;
