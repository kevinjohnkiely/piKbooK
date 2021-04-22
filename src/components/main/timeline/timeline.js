import React, { useEffect, useState } from "react";
import Post from "./post/post";
import Spinner from "../../spinner/spinner";
import firebase from "../../../firebase";

const Timeline = (props) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all posts
  useEffect(() => {
    setLoading(true);
    const db = firebase.firestore();
    return db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
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

  console.log("Rendering....TIMELINE");
  console.log("------------------");

  const deleteComment = (id) => {
    const db = firebase.firestore();
    db.collection("posts").doc(id).delete();
  };

  const thePosts = loadedPosts.map((post) => (
    <Post
      key={post.id}
      post={post}
      postClicked={(id) => deleteComment(id)}
      loadedUserDetails={props.loadedUserDetails}
    />
  ));

  let spinnerOrPosts = (
    <>
      {loadedPosts.length > 0 ? (
        <>
        <section>{thePosts}</section>   
        </>
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

  return <article style={{ paddingTop: "10px" }}>{spinnerOrPosts}</article>;
}

export default Timeline;
