import React, { useState, useEffect } from 'react'
import classes from './main.module.css'
import Sidebar from './sidebar/sidebar'
import Timeline from './timeline/timeline'
import AlertModal from '../alertModal/alertModal'

import firebase from '../../firebase'

function Main () {

    const [ loadedPosts, setLoadedPosts ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    // componentDidMount() {
    //     axios
    //       .get("https://pikbook-2021-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
    //       .then((response) => {
    //         const resArray = Object.values(response.data)
    //         this.setState({ loadedPosts: resArray });
    //         // console.log(this.state.loadedPosts)
    //       })
    //       .catch((error) => {
    //         this.setState({ error: true });
    //       });
    //   }

    useEffect(() => {
        setLoading(true)
            const db = firebase.firestore()
            const unsubscribe = db.collection('posts').onSnapshot((snapshot) => {
                const postsData = []
                snapshot.forEach(doc => postsData.push(({...doc.data(), id: doc.id})))

                if(snapshot.docs.length === 0) {
                    setLoadedPosts([])
                } else {
                    setLoadedPosts(postsData)
                }
                setLoading(false)
            })
            // const data = await db.collection("posts").get()       
            // setLoading(false)
            // if(data.docs.length === 0) {
            //     setLoadedPosts(null)
            // } else {
            //     setLoadedPosts(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            // }
        return unsubscribe
    }, [])

    const addComment = (comment) => {
        setLoading(true)
        const newPost = {
            comment,
            user: 'Kevin'
        }

        const db = firebase.firestore()
        db.collection('posts').add(newPost)
        setLoading(false)
        setSuccess(true)
        setLoadedPosts([...loadedPosts, newPost])

        // axios
        //     .post("https://pikbook-2021-default-rtdb.europe-west1.firebasedatabase.app/posts.json", newPost)
        //     .then((response) => {
        //         setLoading(false)
        //         setError(false)
        //         setSuccess(true)
        //         setLoadedPosts([...this.state.loadedPosts, newPost])
        //     })
        //     .catch((error) => {
        //         setLoading(false)
        //         setError(true)
        //         console.log(error.message);
        //     });
    }

    const deleteComment = (id) => {
        console.log(id)
        const db = firebase.firestore()
        db.collection('posts').doc(id).delete()
    }

    const clearErrorMessage = () => {
        setError(false)
    }

    const clearSuccessMessage = () => {
        setSuccess(false)
    }

    return (
        <section className="container">
            {loading ? <AlertModal 
                message="Loading..."
                type="info" /> : null}
            {error ? <AlertModal 
                message="Network error! Please check your connection!"
                type="failure"
                clicked={clearErrorMessage} /> : null}
            {success ? <AlertModal 
                message="Post was submitted! Thank you :)" 
                type="success"
                clicked={clearSuccessMessage} /> : null}
            <div className={classes.gridLayoutMain}>
                <Sidebar addComment={(comment) => addComment(comment)} />
                {loadedPosts.length > 0 ?
                <Timeline 
                    posts={loadedPosts} 
                    postClicked={(id) => deleteComment(id)} />
                    : <section><h2>Hmmmm...no posts to show!</h2>
                    <p>This could be because nobody has added a post yet, or you could have a connection issue.
                        Please reload app and try again! Thank you.
                    </p></section>
                }
            </div>
            
        </section>
    )
    
}

export default Main