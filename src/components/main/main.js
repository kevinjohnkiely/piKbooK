import React from 'react'
import classes from './main.module.css'
import Sidebar from './sidebar/sidebar'
import Timeline from './timeline/timeline'

const Main = () => {
    return (
        <section className="container">
            <div className={classes.gridLayoutMain}>
                <Sidebar />
                <Timeline />
            </div>
            
        </section>
    )
}

export default Main