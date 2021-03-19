import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
    return (
        <section className={classes.footer}>
            <div className="container">
                <p>piKbooK - by <a href="https://kevinkiely.me">Kevin Kiely</a> &#169; 2021</p>
            </div>
        </section>
    )
}

export default Footer