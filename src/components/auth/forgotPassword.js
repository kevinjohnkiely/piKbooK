import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom'
import classes from "./signup.module.css";
import { useAuth  } from '../../context/authContext'

const ForgotPassword = () => {

    const emailRef  = useRef()
    const { resetPassword } = useAuth()
    const [ error, setError] = useState('')
    const [ message, setMessage] = useState('')
    const [ loading, setLoading ] = useState(false)

    async function handleSubmit(event){
        event.preventDefault()

        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password, please try again!')
        }
        setLoading(false)
    }

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>Forgot Password?</h2>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className={classes.formControl}>
            <input type="email" name="email" placeholder="Email" ref={emailRef} required />
          </div>
          <button disabled={loading} className={classes.btn} type="submit">Reset Password</button>
          
        </form>
        <article className={classes.footer}>
            <p><Link to="/login">Login</Link></p>
        </article>
        <article className={classes.footer}>
            <p>Need an account? <Link to="/signup">Sign Up</Link></p>
        </article>
      </div>
    </section>
  );
};

export default ForgotPassword;
