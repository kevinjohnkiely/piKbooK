import React from 'react'
import classes from './home.module.css'
import home from "../../assets/img/home.jpg";

const Home = () => {
    return (
        <section>
            <div className="container">
                <img src={home} alt="Welcome to piKbooK" />
            </div>
        </section>
    )
}

export default Home