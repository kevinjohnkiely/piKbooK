import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./auth.module.css";
import { useAuth } from "../../context/authContext";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>Update Profile</h2>
        {error && <p className={classes.errorMsg}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={classes.formControl}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div className={classes.formControl}>
            <input
              type="password"
              name="password"
              placeholder="Password (Leave blank to keep the same)"
              ref={passwordRef}
            />
          </div>
          <div className={classes.formControl}>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password (Leave blank to keep the same)"
              ref={passwordConfirmRef}
            />
          </div>
          <button disabled={loading} className={classes.btn} type="submit">
            Update Profile Details
          </button>
        </form>
        <article className={classes.footer}>
          <p>
            Return to Dashboard? <Link to="/dashboard">Cancel</Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default UpdateProfile;
