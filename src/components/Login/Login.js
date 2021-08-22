import React, { useState } from 'react'
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase';
import LockIcon from '@material-ui/icons/Lock';



const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const emailHandler = (e) => { setEmail(e.target.value) }

    const passwordHandler = (e) => { setPassword(e.target.value) }

    const login = (e) => {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((auth) => {
            history.push("/");
        })
        .catch((error) => alert(error.message))
    }

    
    const logout = (e) => {
        e.preventDefault();

        firebase.auth().signOut()
    }

    // const register = (e) => {
    //     e.preventDefault();

    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .then((auth) => {
    //         history.push("/");
    //     })
    //     .catch((error) => alert(error.message))
    // }

    return (
        <div className="login">
            <div className="login__container">
                <LockIcon className="login__container__Icon" />
                <h1>Sign in</h1>
                <form className="login__form">
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
                    <p className="login__disclaimer">By continuing, you agree to this App's Conditions of Use and Privacy Notice.</p>
                    <button className="login__signIn" type="submit" onClick={login}>Sign in</button>
                    <button className="login__signIn" type="submit" onClick={logout}>Sign out</button>
                </form>

                <p className="button_createAccount" onClick={() => setRegister(true)}>No account yet? <strong>Create your Account</strong></p>
            </div>
        </div>
    )
}
 
 
 
export default Login;