import React, { useRef, useState } from 'react'
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase';
import LockIcon from '@material-ui/icons/Lock';
import Register from './Register';
import { Snackbar } from '@material-ui/core';
import { AddAlert } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';



const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false)
    const submitButtonRef = useRef();
    const [register, setRegister] = useState(false);

    const emailHandler = (e) => { setEmail(e.target.value) }
    const passwordHandler = (e) => { setPassword(e.target.value) }

    const login = (e) => {
        e.preventDefault();
        submitButtonRef.current.disabled = true;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((auth) => {
            history.push("/");
        })
        .catch((error) => {
            // alert(error.message)
            setLoginError(true)
            submitButtonRef.current.disabled = false;
        })
    }

    const registerFormHandler = () => { setRegister(false) }

    
    return (
        <>
            <div className="login">
                {!register ?
                    <div className="login__container">
                        <LockIcon className="login__container__Icon" />
                        <h1>Sign in</h1>

                        { loginError && <Alert severity="error" className="login_error">Email and password do not match!</Alert> }

                        <form className="login__form account__form">
                            <h5>E-mail</h5>
                            <input 
                                type="text"
                                value={email}
                                onChange={emailHandler}
                            />
                            <h5>Password</h5>
                            <input
                                type="password"
                                value={password}
                                onChange={passwordHandler}
                            />
                            <p className="login__disclaimer form__disclaimer">
                                By continuing, you agree to this App's Conditions of Use and Privacy Notice.
                            </p>
                            <button
                                ref = {submitButtonRef}
                                className="login__signIn form__button"
                                type="submit"
                                onClick={login}
                            >
                                Sign in
                            </button>
                        </form>

                        <p className="button_createAccount">No account yet? <strong onClick={() => setRegister(true)}>Create your Account</strong></p>
                    </div> :
                    <Register setRegister={registerFormHandler}/>
                }   
            </div>  
        </>
    )
}
 
 
 
export default Login;