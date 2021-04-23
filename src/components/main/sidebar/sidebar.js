import React, { useState } from "react";
import classes from "./sidebar.module.css";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Sidebar = (props) => {
  console.log("Rendering....SIDEBAR");
  console.log("------------------");

  const { currentUser, logout } = useAuth();
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentUser) {
      if (props.loadedUserDetails.username) {
        props.addComment(comment);
      } else {
        setMessage("Please complete your profile to comment!");
        setTimeout(() => {
          history.push("/complete-profile");
        }, 3000);
      }
      setComment("");
    } else {
      setMessage("Please login/signup to comment!");
    }
  };

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out!");
    }
  }

  return (
    <aside className={classes.sidebarForm}>
      <div className={classes.userPanel}>
        <div className={classes.userPanelHeader}>
          <h3>
            Welcome,{" "}
            <span className={classes.highlighted}>
              {props.loadedUserDetails.username
                ? props.loadedUserDetails.username
                : "Guest"}
            </span>
          </h3>
          {props.loadedUserDetails.profilePic ? (
            <img
              src={props.loadedUserDetails.profilePic}
              alt={props.loadedUserDetails.username}
            />
          ) : (
            <i className="fas fa-user-circle fa-3x"></i>
          )}
        </div>
        <div className={classes.userPanelLocation}>
          <i className="fas fa-map-marker-alt fa-2x"></i>
          <span>{props.loadedUserDetails.location}</span>
        </div>
        <div className={classes.userPanelBody}>
          <Link onClick={handleLogout}>Logout</Link>
          <Link Link to="/update-profile">
            Change Email/Password
          </Link>
          <Link Link to="/change-picture">
            Change Photo
          </Link>
        </div>
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
            required
          />
          <button>Submit</button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
