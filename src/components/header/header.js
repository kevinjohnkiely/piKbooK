import React from 'react'
import classes from './header.module.css'
import logo from '../../assets/img/logoWhite.png'

const Header = () => {
    return (
        <header className={classes.header}>
            <div className="container">
                <div className={classes.flexHeader}>
                    <div className={classes.logo}>
                        <a href="/"><img src={logo} alt="piKbooK"/></a>
                    </div>
                    <nav className={classes.menu}>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Login</a></li>
                            <li><a href="#">Signup</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header