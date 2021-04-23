import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import firebase from "../../firebase";
import Spinner from "../spinner/spinner";
import classes from "../main/timeline/post/post.module.css";
import { useHistory } from 'react-router-dom'

function FullPost(props) {
  const [loading, setLoading] = useState(false);
  const [loadedPost, setLoadedPost] = useState(null);
  const [ postText, setPostText ] = useState('')
  const history = useHistory()

  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    db
      .collection("posts")
      .doc(props.match.params.id)
      .get()
      .then((docRef) => {
        setLoadedPost(docRef.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [props.match.params.id]);

  const handleChange = (event) => {
    setPostText(event.target.value);
  };

  const changeComment = (event) => {
    event.preventDefault()
    const db = firebase.firestore();
    db.collection("posts").doc(props.match.params.id).update({ comment: postText})

    history.push('/home')
  }

  let spinnerOrPost = (
    <section className="container">
      <h2>Edit your post</h2>
      <br></br>
      {loadedPost ? (
        <div className={classes.post}>
          <div className={classes.postHeader}>
            <div className={classes.postAvatar}>
              <img src={loadedPost.profilePic} alt={loadedPost.comment} />
            </div>
            <h4>{loadedPost.user}</h4>
          </div>
          <form onSubmit={changeComment}>
          <div className={classes.postBody}><textarea 
            placeholder={loadedPost.comment} required value={postText} onChange={handleChange} /></div>
          <div className={classes.postFooter}>
            <button type="submit">Save Changes!</button>
            
          </div>
          </form>
          
        </div>
      ) : (
        <p>This post doesn't exist, please load another one! :)</p>
      )}
    </section>
    
  );

  if (loading) {
    spinnerOrPost = <Spinner />;
  }

  return <div>{spinnerOrPost}</div>;
}

export default FullPost;
