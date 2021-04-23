import React from "react";
import classes from "./header.module.css";
import logo from "../../assets/img/logoWhite.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.flexHeader}>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="piKbooK" />
            </Link>
          </div>
          <nav className={classes.menu}>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              {!currentUser && (
                <>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}

              {currentUser && (
                  <>
                  <li>
                  <Link to="/home">Timeline</Link>
                </li>
                <li>
                  <Link to="/dashboard">Account</Link>
                </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
