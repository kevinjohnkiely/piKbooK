import React, { useState, useEffect } from "react";
import classes from "./post.module.css";
import { Link } from "react-router-dom";
import { useAuth } from '../../../../context/authContext'
import Spinner from '../../../spinner/spinner'

import firebase from "../../../../firebase";

const Post = ({ post, postClicked, loadedUserDetails }) => {
  const [loading, setLoading] = useState(false);
  const [loadedLikes, setLoadedLikes] = useState([]);
  const [checkDelete, setCheckDelete] = useState(false);
  const { currentUser } = useAuth()

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
      postId
    }
    const db = firebase.firestore();
    db.collection("likes").add(newLike);
  }

  const calculateLikes = (id) => {
    const filteredLikes = loadedLikes.filter(
        (like) => like.postId === id
      );
    return filteredLikes.length
  }

  const checkIfPostLiked = (id) => {    
      const checkLikes = loadedLikes.filter(
          (like) => like.postId === id
      )
      const result = checkLikes.filter(like => like.userId === currentUser.uid)
      if(result.length > 0){
          return true
      } else {
          return false
      }
  }

  let spinnerOrPost = (
      
    <div className={classes.post}>
        
      <div className={classes.postHeader}>
        <div className={classes.postAvatar}>
          <img src={post.profilePic} />
        </div>
        <h4>{post.user}</h4>
      </div>
      <div className={classes.postBody}>
        {post.comment + " "}
        <Link to={"/post/" + post.id}>Read More...</Link>
      </div>
      {loadedUserDetails.username ? (
        <div className={classes.postFooter}>
          <span className={classes.likes}>{calculateLikes(post.id)} like{calculateLikes(post.id) > 1 ? 's' : ''}</span>
          {checkIfPostLiked(post.id) ? <button disabled>Liked!</button> :
          <button onClick={() => addLike(post.id)}>Like</button> }
          
          {loadedUserDetails.userId === post.userId ? (
            <button onClick={() => setCheckDelete(!checkDelete)}>Delete</button>
          ) : null}
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

  return (
      <div>{ spinnerOrPost }</div>
      
  )
};

export default Post;
