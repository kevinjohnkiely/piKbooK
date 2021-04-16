import React, { useState, useEffect } from 'react'
import classes from './sidebar.module.css'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'

const Sidebar = (props) => {

    const { currentUser } = useAuth()
    const [ comment, setComment ] = useState('')
    const [ message, setMessage ] = useState('')
    // const [ loadedUserDetails, setLoadedUserDetails] = useState({})
    const history = useHistory()

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (currentUser) {
            if(props.loadedUserDetails.username) {
                props.addComment(comment)
            } else {
                setMessage('Please complete your profile to comment!')
                setTimeout(() => {
                    history.push('/complete-profile')
                }, 3000)
            }
        setComment('')
        } else {
            setMessage('Please login/signup to comment!')
        }
    }

        return (
        <aside className={classes.sidebarForm}>
            <div className={classes.userPanel}>
                <img src={props.loadedUserDetails.profilePic} alt={props.loadedUserDetails.username} />
                <p>Welcome, <span className={classes.highlighted}>
                    {props.loadedUserDetails.username ? props.loadedUserDetails.username : 'Guest'}
                    </span>
                </p>
            </div>
            <div className={classes.formCard}>
                
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