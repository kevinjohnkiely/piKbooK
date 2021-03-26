import React, { useState } from 'react'
import classes from './post.module.css'
import { Link } from 'react-router-dom'

const Post = ({ post, postClicked }) => {

    const [ checkDelete, setCheckDelete] = useState(false)

    return (
        <div className={classes.post}>
            <div className={classes.postHeader}>
                <i className="fas fa-user-circle fa-3x"></i>
                <h4>{post.user}</h4>
            </div>
            <div className={classes.postBody}>
                {post.comment + " "}
                <Link to={'/post/' + post.id }>Read More...</Link>
            </div>
            <div className={classes.postFooter}>
                <button>Like</button>
                <button onClick={() => setCheckDelete(!checkDelete)}>Delete</button>
            </div>
            {checkDelete ? <div className={classes.postCheckDelete}>
                <p>Are you sure?</p>
                <button onClick={() => postClicked(post.id)}>YUP!</button>
                <button onClick={() => setCheckDelete(!checkDelete)}>NOPE!</button>
            </div> : null }
            
        </div>
    )
}

export default Post