import React, { useState, useEffect } from "react";
import classes from "./post.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import Spinner from "../../../spinner/spinner";

import firebase from "../../../../firebase";

const Post = ({ post, postClicked, loadedUserDetails }) => {

  // console.log('Rendering....POST');
  // console.log('------------------');

  const [loading, setLoading] = useState(false);
  const [loadedLikes, setLoadedLikes] = useState([]);
  const [checkDelete, setCheckDelete] = useState(false);
  const { currentUser } = useAuth();

  // get all post likes
  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return db.collection("likes").onSnapshot((snapshot) => {
      const likesData = [];
      snapshot.forEach((doc) => likesData.push({ ...doc.data(), id: doc.id }));

      if (snapshot.docs.length === 0) {
        setLoadedLikes([]);
      } else {
        setLoadedLikes(likesData);
      }
      setLoading(false);
    });
    // return unsubscribe;
  }, []);

  const addLike = (postId) => {
    const newLike = {
      user: loadedUserDetails.username,
      userId: loadedUserDetails.userId,
      postId,
    };
    const db = firebase.firestore();
    db.collection("likes").add(newLike);
  };

  const calculateLikes = (id) => {
    const filteredLikes = loadedLikes.filter((like) => like.postId === id);
    return filteredLikes.length;
  };

  const getListOfLikes = (id) => {
    const likeArray = []
    const listLikes = loadedLikes.filter(like => like.postId === id)
    listLikes.forEach(like => {
      likeArray.push(like.user)
    })
    let likeText = ''
    likeArray.forEach(likeAr => {
      likeText += likeAr + '...'
    })
    return likeText
  }

  const checkIfPostLiked = (id) => {
    const checkLikes = loadedLikes.filter((like) => like.postId === id);
    const result = checkLikes.filter((like) => like.userId === currentUser.uid);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  let spinnerOrPost = (
    <div className={classes.post}>
      <div className={classes.postHeader}>
        <div className={classes.postAvatar}>
          <img src={post.profilePic} alt={post.user} />
        </div>
        <h4>{post.user}</h4>
      </div>
      <div className={classes.postBody}>{post.comment}</div>
      <div className={classes.postDate}>Posted on {post.timestamp}</div>
      {loadedUserDetails.username ? (
        <div className={classes.postFooter}>
          <div>
            {checkIfPostLiked(post.id) ? (
              <button className={classes.btn} disabled>Liked!</button>
            ) : (
              <button onClick={() => addLike(post.id)}>
                <i className="fas fa-thumbs-up"></i>
              </button>
            )}
            <span className={classes.likes}>
              {calculateLikes(post.id)} like
              {calculateLikes(post.id) > 1 || calculateLikes(post.id) === 0 ? "s" : ""}
            </span>
            <span className={classes.listLikes}>
              Liked by: {getListOfLikes(post.id)}
            </span>
          </div>
          <div>
            {loadedUserDetails.userId === post.userId ? (
              <>
                <Link to={"/post/" + post.id}>
                  <button>
                    <i className="fas fa-edit"></i>
                  </button>
                </Link>
                <button onClick={() => setCheckDelete(!checkDelete)}>
                  <i className="fas fa-times"></i>
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {checkDelete ? (
        <div className={classes.postCheckDelete}>
          <p>Are you sure?</p>
          <button onClick={() => postClicked(post.id)}>YES</button>
          <button onClick={() => setCheckDelete(!checkDelete)}>NOPE!</button>
        </div>
      ) : null}
    </div>
  );

  if (loading) {
    spinnerOrPost = <Spinner />;
  }

  return <div>{spinnerOrPost}</div>;
};

export default Post;
