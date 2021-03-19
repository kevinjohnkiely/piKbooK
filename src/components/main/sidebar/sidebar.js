import React from 'react'
import classes from './sidebar.module.css'

const Sidebar = () => {
    return (
        <aside className={classes.sidebarForm}>
            <div className={classes.formCard}>
                <h2>Create a post!</h2>
                <form name="addComment">
                    <input type="text" placeholder="Add a comment here..." required />
                    <button>Submit</button>
                </form>
            </div>
        </aside>
    )
}

export default Sidebar