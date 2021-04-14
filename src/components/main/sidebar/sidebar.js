import React, { useState, useEffect } from 'react'
import classes from './sidebar.module.css'
import { useAuth } from '../../../context/authContext'

const Sidebar = (props) => {

    const { currentUser } = useAuth()
    const [ comment, setComment ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loadedUserDetails, setLoadedUserDetails] = useState({})

    // useEffect(() => {
    //     if(currentUser) {
    //         console.log(currentUser.uid);
    //         const db = firebase.firestore();
    //         const userRef = db.collection('users').where("userId", "==", currentUser.uid).get()
    //             .then(data => {
    //                 data.forEach(doc => {
    //                     console.log(doc.data())
    //                     setLoadedUserDetails(doc.data())
    //                 })
    //             });
    //     }
        
    //   },[currentUser])

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (currentUser) {
            if(props.loadedUsername) {
                props.addComment(comment)
            } else {
                setMessage('Please complete your profile to comment!')
            }
        setComment('')
        } else {
            setMessage('Please login/signup to comment!')
        }
    }

        return (
        <aside className={classes.sidebarForm}>
            <div className={classes.formCard}>
                <p>Welcome, {props.loadedUsername ? props.loadedUsername : 'Guest'}</p>
                <h2>Create a post!</h2>
                {message && <p className={classes.errorMsg}>{message}</p>}
                
                <form onSubmit={handleSubmit} name="addComment">
                    <input 
                        type="text" 
                        placeholder="Add a comment here..." 
                        value={comment}
                        onChange={handleChange}
                        required />
                    <button>Submit</button>
                </form>
            </div>
        </aside>
    )
}

export default Sidebar