import React, { useRef, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import classes from "./auth.module.css";
import { useAuth  } from '../../context/authContext'

const Signup = () => {

    const emailRef  = useRef()
    const passwordRef  = useRef()
    const passwordConfirmRef  = useRef()
    const { signup } = useAuth()
    const [ error, setError] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match!')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/complete-profile')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>Sign Up</h2>
        {error && <p className={classes.errorMsg}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={classes.formControl}>
            <input type="email" name="email" placeholder="Email" ref={emailRef} required />
          </div>
          <div className={classes.formControl}>
            <input type="password" name="password" placeholder="Password" ref={passwordRef} required />
          </div>
          <div className={classes.formControl}>
            <input type="password" name="passwordConfirm" placeholder="Confirm Password" ref={passwordConfirmRef} required />
          </div>
          <button disabled={loading} className={classes.btn} type="submit">Sign Up</button>
          
        </form>
        <article className={classes.footer}>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
        </article>
      </div>
    </section>
  );
};

export default Signup;
