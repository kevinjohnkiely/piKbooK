import React, { Component } from 'react'
import classes from './timeline.module.css'

import Post from './post/post'

class Timeline extends Component {

    render() {

        const thePosts = this.props.posts.map(post => (
            <Post key={post.id} post={post} postClicked={this.props.postClicked} />
        ))

    return (
            <article className={classes.mainPosts}>
                {thePosts}
            </article>
        )
    }

}

export default Timeline