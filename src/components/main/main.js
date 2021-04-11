import React, { useState, useEffect } from "react";
import classes from "./main.module.css";
import Sidebar from "./sidebar/sidebar";
import Timeline from "./timeline/timeline";
import AlertModal from "../alertModal/alertModal";
import Spinner from "../spinner/spinner";
import firebase from "../../firebase";


function Main() {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return db.collection("posts").onSnapshot((snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => postsData.push({ ...doc.data(), id: doc.id }));

      console.log(snapshot.docs.length);

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
      user: "Joyce"
    };

    const db = firebase.firestore();
    db.collection("posts").add(newPost);
    setLoading(false);
    setSuccess(true);
    // setLoadedPosts([...loadedPosts, newPost]);
  };

  const deleteComment = (id) => {
    console.log(id);
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
        <Timeline posts={loadedPosts} postClicked={(id) => deleteComment(id)} />
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

  return (
    <section className="container">
      {/* {loading ? <AlertModal 
                message="Loading..."
                type="info" /> : null} */}
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
        <Sidebar addComment={(comment) => addComment(comment)} />
        {spinnerOrPosts}
      </div>
    </section>
    
  );
}

export default Main;
