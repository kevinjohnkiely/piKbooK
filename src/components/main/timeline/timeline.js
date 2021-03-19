import React, { Component } from 'react'
import classes from './timeline.module.css'
import posts from '../../../assets/posts'

import Post from './post/post'

class Timeline extends Component {

    state = {
        loadedPosts: [...posts]
    }

    render() {

        const thePosts = this.state.loadedPosts.map(post => (
            <Post post={post} />
        ))

    return (
            <article className={classes.mainPosts}>
                {thePosts}
            </article>
        )
    }

}

export default Timeline