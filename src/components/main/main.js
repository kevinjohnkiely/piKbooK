import React, { Component } from 'react'
import classes from './main.module.css'
import Sidebar from './sidebar/sidebar'
import Timeline from './timeline/timeline'
import AlertModal from '../alertModal/alertModal'

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

// import posts from '../../assets/posts'

class Main extends Component {

    state = {
        loadedPosts: null,
        loading: false,
        error: false,
        success: false
    }

    componentDidMount() {
        console.log('COmponent did mount = main component')
        axios
          .get("https://pikbook-2021-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
          .then((response) => {
            const resArray = Object.values(response.data)
            this.setState({ loadedPosts: resArray });
            // console.log(this.state.loadedPosts)
          })
          .catch((error) => {
            this.setState({ error: true });
          });
      }

    addComment = (comment) => {
        this.setState({ loading: true });
        const newPost = {
            postId: uuidv4(),
            comment,
            user: 'Kevin'
        }
        axios
            .post("https://pikbook-2021-default-rtdb.europe-west1.firebasedatabase.app/posts.json", newPost)
            .then((response) => {
                this.setState({ loading: false, 
                    error: false, 
                    success: true,
                    loadedPosts: [...this.state.loadedPosts, newPost]
                });
            })
            .catch((error) => {
                this.setState({ loading: false, error: true });
                console.log(error.message);
            });
    }

    deleteComment = (id) => {
        console.log(id)
        axios
            .get('https://pikbook-2021-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy="postId"')
            .then((response) => {
                // this.setState({ loading: false, 
                //     error: false, 
                //     success: true,
                //     loadedPosts: [...this.state.loadedPosts, newPost]
                // });
                console.log(response.data)
            })
        // const newPosts = this.state.loadedPosts.filter(post => id !== post.id)
        // this.setState({ loadedPosts: newPosts })
    }

    clearErrorMessage = () => {
        this.setState({ error: false })
    }

    clearSuccessMessage = () => {
        this.setState({ success: false })
    }

    render() {
        return (
        <section className="container">
            {this.state.loading ? <AlertModal 
                message="Loading..."
                type="info" /> : null}
            {this.state.error ? <AlertModal 
                message="Network error! Please check your connection!"
                type="failure"
                clicked={this.clearErrorMessage} /> : null}
            {this.state.success ? <AlertModal 
                message="Post was submitted! Thank you :)" 
                type="success"
                clicked={this.clearSuccessMessage} /> : null}
            <div className={classes.gridLayoutMain}>
                <Sidebar addComment={(comment) => this.addComment(comment)} />
                {this.state.loadedPosts ?
                <Timeline 
                    posts={this.state.loadedPosts} 
                    postClicked={(id) => this.deleteComment(id)} />
                    : <h2>No posts yet...please add one!</h2>
                }
            </div>
            
        </section>
    )
    }
    
}

export default Main