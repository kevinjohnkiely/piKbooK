import React, { useState } from "react";
import classes from "./signup.module.css";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out!");
    }
  }

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>User Dashboard</h2>
        {error && <p>{error}</p>}
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <Link to="/update-profile">Update Profile</Link>
        <article className={classes.footer}>
          <p>
            <button className={classes.btn} onClick={handleLogout}>
              Log Out
            </button>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
