import React, { useRef, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import classes from "./auth.module.css";
import { useAuth  } from '../../context/authContext'

const Login = () => {

    const emailRef  = useRef()
    const passwordRef  = useRef()
    const { login } = useAuth()
    const [ error, setError] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(event){
        event.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to login')
        }
        setLoading(false)
    }

  return (
    <section className="container">
      <div className={classes.card}>
        <h2>Login</h2>
        {error && <p className={classes.errorMsg}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={classes.formControl}>
            <input type="email" name="email" placeholder="Email" ref={emailRef} required />
          </div>
          <div className={classes.formControl}>
            <input type="password" name="password" placeholder="Password" ref={passwordRef} required />
          </div>
          <button disabled={loading} className={classes.btn} type="submit">Login</button>
          
        </form>
        <article className={classes.footer}>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
        </article>
        <article className={classes.footer}>
            <p>Need an account? <Link to="/signup">Sign Up</Link></p>
        </article>
      </div>
    </section>
  );
};

export default Login;
