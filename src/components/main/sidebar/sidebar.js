import React, { Component } from 'react'
import classes from './sidebar.module.css'

class Sidebar extends Component {

    state = {
        comment: ''
    }

    handleChange = (event) => {
        this.setState({ comment: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addComment(this.state.comment)
        this.setState({ comment: '' })
    }

    render() {
        return (
        <aside className={classes.sidebarForm}>
            <div className={classes.formCard}>
                <h2>Create a post!</h2>
                <form onSubmit={this.handleSubmit} name="addComment">
                    <input 
                        type="text" 
                        placeholder="Add a comment here..." 
                        value={this.state.comment}
                        onChange={this.handleChange}
                        required />
                    <button>Submit</button>
                </form>
            </div>
        </aside>
    )
    }
}

export default Sidebar