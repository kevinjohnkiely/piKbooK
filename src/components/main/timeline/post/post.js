import React, { useState } from 'react'
import classes from './post.module.css'
import { Link } from 'react-router-dom'

const Post = ({ post, postClicked, loadedUserDetails }) => {

    const [ checkDelete, setCheckDelete] = useState(false)

    console.log(loadedUserDetails.profilePic);

    return (
        <div className={classes.post}>
            <div className={classes.postHeader}>
                {/* <i className="fas fa-user-circle fa-3x"></i> */}
                <div className={classes.postAvatar}>
                    <img src={post.profilePic} />
                </div>
                <h4>{post.user}</h4>
            </div>
            <div className={classes.postBody}>
                {post.comment + " "}
                <Link to={'/post/' + post.id }>Read More...</Link>
            </div>
            {loadedUserDetails.username ? <div className={classes.postFooter}>
                <button>Like</button>
                {loadedUserDetails.userId === post.userId ? 
                <button onClick={() => setCheckDelete(!checkDelete)}>Delete</button> : null }
                
            </div> : null }
            
            {checkDelete ? <div className={classes.postCheckDelete}>
                <p>Are you sure?</p>
                <button onClick={() => postClicked(post.id)}>YES</button>
                <button onClick={() => setCheckDelete(!checkDelete)}>NOPE!</button>
            </div> : null }
            
        </div>
    )
}

export default Post