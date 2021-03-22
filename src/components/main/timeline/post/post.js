import React from 'react'
import classes from './post.module.css'

const Post = ({ post, postClicked }) => {
    return (
        <div className={classes.post}>
            <div className={classes.postHeader}>
                <i className="fas fa-user-circle fa-3x"></i>
                <h4>{post.user}</h4>
            </div>
            <div className={classes.postBody}>
                {post.comment}
            </div>
            <div className={classes.postFooter}>
                <button>Like</button>
                <button onClick={() => postClicked(post.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Post