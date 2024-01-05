import React, { useRef, useState, useEffect } from 'react'
import axios from '../api/axios'
import '../css/App.css' // You can create a Login.css file for styling
import AuthContext from '../context/authProvider'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom';
const LOGIN_URL = '/auth' // Update with your login endpoint


export const Login = () => {
    const {setAuth} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef()
    const passwordRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errmsg, setErrmsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        // Add any necessary initialization logic
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            const accessToken = response?.data?.accessToken
            setAuth({username, password, accessToken})
            navigate(from, { replace: true });
            // Clear input fields or perform any necessary actions on successful login
        } catch (err) {
            if (!err.response) {
                setErrmsg("No server response!")
            } else if (err.response.status === 401) {
                setErrmsg("Invalid username or password!")
            } else {
                setErrmsg("Login failed!")
            }
            errRef.current.focus()
        }
    }

    return (


                <section>
                    <p ref={errRef} className={errmsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errmsg}</p>

                    <h1>Login</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Your username"
                            required
                        />

                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            ref={passwordRef}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            required
                        />

                        <button>Log In</button>
                    </form>

                    <p>
                        Don't have an account? <br />
                        <span>
                            {/* Add registration link or button */}
                            <a href='/register'>Sign Up</a>
                        </span>
                    </p>
                </section>

    )
}
