import React, { useState } from "react";
import classes from "./auth.module.css";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  console.log(currentUser)

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
    <section className="container">
      <div className={classes.card}>
        <h2>Your Account Details</h2>
        {error && <p className={classes.errorMsg}>{error}</p>}
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <article className={classes.footer}>
          <p>
            <Link to="/update-profile">Change E-mail/Password</Link>
          </p>
        </article>
        <p>
          <strong>Profile Photo:</strong>
        </p>
        <article className={classes.footer}>
          <p>
            <Link to="/change-picture">Change Profile Photo</Link>
          </p>
        </article>

        <article className={classes.footer}>
          <button className={classes.btn} onClick={handleLogout}>
            Log Out
          </button>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
