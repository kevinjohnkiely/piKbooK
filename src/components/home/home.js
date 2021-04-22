import React from 'react'
import home from "../../assets/img/home.jpg";

const Home = () => {
    return (
        <section>
            <div className="container">
                <img src={home} style={{ width: '100%'}} alt="Welcome to piKbooK" />
            </div>
        </section>
    )
}

export default Home