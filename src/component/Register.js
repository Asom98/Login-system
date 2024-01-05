import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/Register.css'
import axios from '../api/axios'

const usernameRegex = /^[a-zA-Z0-9_-]{4,16}$/
const passwordRegex = /^(?=.*[a-z])[A-Za-z\d@$!%*#?&]{8,24}$/
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


const REGISTER_URL = '/register'

export const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errmsg, setErrmsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{

        

    }, [])

    useEffect(()=>{

        const result = usernameRegex.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)

        
    }, [user])

    useEffect(()=>{

        const result = emailRegex.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)

        
    }, [email])

    useEffect(()=>{

        const result = passwordRegex.test(password)
        //console.log("passState: " ,result)
        //console.log("pass: " ,password)
        setValidPassword(result)
        const match = password === matchPassword
        setValidMatch(match)
        //console.log("validMatch222: " ,validMatch , match)
        //console.log("_______")
        //console.log("_______")

    }, [password, matchPassword])

    useEffect(()=>{

        setErrmsg("")

    }, [user, password, matchPassword])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        //prevent js hack 
        const v1 = usernameRegex.test(user)
        const v2 = passwordRegex.test(password)
        if(!v1 || !v2){
            setErrmsg("Invalid Entry")
            return
        }
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username: user, email, password }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            // Clear input fields
        } catch (err) {
            if (!err.response) {
                setErrmsg("No server response!");
            } else if (err.response.status === 409) {
                setErrmsg("Username is taken!");
            } else {
                setErrmsg("Registration failed!");
            }
            errRef.current.focus();
        }
    }


  return (
    <>
    {
        success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href='#'>Sign In</a>
                </p>
            </section>
        ) : (
    
    <section>
        <p ref={errRef} className={errmsg ? "errmsg":
        "offscreen"} aria-live='assertive'>{errmsg}</p>

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
            Username:
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                placeholder="Dave"
                required
                aria-invalid={validName ? "false": "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />

            <label htmlFor='email'>
            E-mail:
                <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type='text'
                id='email'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                aria-invalid={validName ? "false": "true"}
                aria-describedby='uidnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() =>setEmailFocus(false)}
            />

            <label htmlFor='password'>
            Password:
                <span className={validPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validPassword || !password ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type='password'
                id='password'
                ref={userRef}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secret123"
                required
                aria-invalid={validPassword ? "false": "true"}
                aria-describedby='pwnote'
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
            />

            <label htmlFor='confirmPassword'>
            Confirm password: 
                <span className={ (validMatch && validPassword )  ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validMatch ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type='password'
                id='confirmPassword'
                onChange={(e) => setMatchPassword(e.target.value)}
                placeholder="Secret123"
                required
                aria-invalid={validMatch  ? "false": "true"}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />

            <button disabled={!validName || !validPassword || !validMatch ? true: false}> Sign up</button>
        </form>
        <p>
            Have account? <br/>
            <span>
                {}
                <a href='/login'>Sign In</a>
            </span>
        </p>
    </section>
        )}
        </>
  )
}
