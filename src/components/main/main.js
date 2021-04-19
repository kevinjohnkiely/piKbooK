import React, { useState, useEffect } from "react";
import classes from "./main.module.css";
import Sidebar from "./sidebar/sidebar";
import Timeline from "./timeline/timeline";
import AlertModal from "../alertModal/alertModal";
import Spinner from "../spinner/spinner";
import firebase from "../../firebase";

import { useAuth } from '../../context/authContext'

function Main() {

  const { currentUser } = useAuth()

  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loadedLikes, setLoadedLikes] = useState([]);
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
        const userRef = db.collection('users').where("userId", "==", currentUser.uid).get()
            .then(data => {
                data.forEach(doc => {
                    setLoadedUserDetails(doc.data())
                    setLoadingUser(false)
                })
            });
            setLoadingUser(false)
    }
    
  },[currentUser])

  // get all posts
  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return db.collection("posts").onSnapshot((snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => postsData.push({ ...doc.data(), id: doc.id }));

      if (snapshot.docs.length === 0) {
        setLoadedPosts([]);
      } else {
        setLoadedPosts(postsData);
      }
      setLoading(false);
    });
    // return unsubscribe;
  }, []);


  const addComment = (comment) => {
    setLoading(true);
    const newPost = {
      comment,
      user: loadedUserDetails.username,
      userId: loadedUserDetails.userId,
      profilePic: loadedUserDetails.profilePic
    };

    const db = firebase.firestore();
    db.collection("posts").add(newPost);
    setLoading(false);
    setSuccess(true);
  };

  const deleteComment = (id) => {
    const db = firebase.firestore();
    db.collection("posts").doc(id).delete();
  };

  const clearErrorMessage = () => {
    setError(false);
  };

  const clearSuccessMessage = () => {
    setSuccess(false);
  };

  let spinnerOrPosts = (
    <>
      {loadedPosts.length > 0 ? (
        <Timeline 
          posts={loadedPosts}
          postClicked={(id) => deleteComment(id)}
          loadedUserDetails={loadedUserDetails} />
      ) : (
        <section>
          <h2>Hmmmm...no posts to show!</h2>
          <p>
            This could be because nobody has added a post yet, or you could have
            a connection issue. Please reload app and try again! Thank you.
          </p>
        </section>
      )}
    </>
  );
  if (loading) {
    spinnerOrPosts = <Spinner />;
  }

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
        {spinnerOrPosts}
        
      </div>
    </section>
    
  );
}

export default Main;
