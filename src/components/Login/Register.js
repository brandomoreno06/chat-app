import React, { useState } from 'react'
import './Register.css';
import { useHistory } from "react-router-dom";
import { Alert } from '@material-ui/lab';
import firebase from 'firebase';
import db from '../../firebase';



const Register = (props) => {
    const [registrationError, setRegistratonError] = useState(false)
    const history = useHistory();
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const {firstName, lastName, email, password, passwordConfirm} = input;
    const inputHandler = (e) => {
        const name = e.target.name;
        setInput({...input, [name]: e.target.value})
        if (registrationError == true) { setRegistratonError(false) }
    }

    const register = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setRegistratonError(true)
        }

        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            const usersRef = db.collection("users")
            const usersPublicRef = db.collection("users_public")
            usersRef.doc().set({
                email: email,
                uid: auth.user.uid,
                displayName: `${firstName} ${lastName}`,
                photoURL: "",
                friends: firebase.firestore.FieldValue.arrayUnion(),
                conversations: firebase.firestore.FieldValue.arrayUnion("community")
            })

            usersPublicRef.doc().set({
                email: email,
                uid: auth.user.uid,
                displayName: `${firstName} ${lastName}`,
            })

            auth.user.updateProfile({
                displayName: `${firstName} ${lastName}`,
            })
            
        })
        .then(() => {
            history.push("/");
        })
        .catch((error) => alert(error.message))
    }

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    
    return (
        <div className="register__container">
            <h1>Create an account</h1>
            { registrationError && <Alert severity="error" className="login_error">Passwords do not match!</Alert> }

            <form className="register__form account__form">
                <div className="form__nameField">
                    <div>
                        <h5>First Name</h5>
                        <input 
                            type="text"
                            name="firstName"
                            value={firstName}
                            minLength="3"
                            maxLength="30"
                            onChange={inputHandler}
                        />
                    </div>
                    <div>
                        <h5>Last Name</h5>
                        <input
                            className="form__nameField--end"
                            type="text"
                            name="lastName"
                            minLength="3"
                            maxLength="30"
                            value={lastName}
                            onChange={inputHandler}
                        />
                    </div>
                </div>

                <div>
                    <h5>E-mail</h5>
                    <input 
                        type="text"
                        name="email"
                        value={email}
                        onChange={inputHandler}
                        pattern={emailFormat}
                    />
                </div>

                <div>
                    <h5>Password</h5>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={inputHandler}
                    />
                </div>

                <div>
                    <h5>Confirm Password</h5>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={inputHandler}
                    />
                </div>

                <p className="login__disclaimer form__disclaimer">By continuing, you agree to this App's Conditions of Use and Privacy Notice.</p>
                <button className="register__button form__button" type="submit" onClick={register}>Register and Sign in</button>
            </form>

            <p className="button_createAccount">Return to <strong onClick={() => props.setRegister(false)}>sign-in page</strong></p>
        </div>
    )
}
 
 
 
export default Register;