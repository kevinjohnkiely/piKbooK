import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import Spinner from "../spinner/spinner";
import classes from "../main/timeline/post/post.module.css";

function FullPost(props) {
  const [loading, setLoading] = useState(false);
  const [loadedPost, setLoadedPost] = useState(null);

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    const data = db
      .collection("posts")
      .doc(props.match.params.id)
      .get()
      .then((docRef) => {
        setLoadedPost(docRef.data());
        console.log(docRef.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [props.match.params.id]);

  let spinnerOrPost = (
    <section className="container">
      {loadedPost ? (
        <div className={classes.post}>
          <div className={classes.postHeader}>
            <div className={classes.postAvatar}>
              <img src={loadedPost.profilePic} />
            </div>
            <h4>{loadedPost.user}</h4>
          </div>
          <div className={classes.postBody}>{loadedPost.comment}</div>
          <div className={classes.postFooter}>
            
            <button onClick={() => {}}>Edit Post</button>
          </div>
        </div>
      ) : (
        <p>This post doesn't exist, please load another one! :)</p>
      )}
    </section>
  );

  if (loading) {
    console.log("hello");
    spinnerOrPost = <Spinner />;
  }

  return <div>{spinnerOrPost}</div>;
}

export default FullPost;
