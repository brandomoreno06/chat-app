import React from 'react'
import { Link } from 'react-router-dom';
import './Landing.css';
 
 
 
const Landing = (props) => {
  return (
    <div className="landingPage">
      <div className="landingPage__left">
        <div className="image__container">
          <img src="/images/conversation-icon.png" alt="" />
        </div>
      </div>
      <div className="landingPage__right">
        <div className="landingPage__content">
          <h1 className="landingPage__title">Hello there!</h1>
          <h1 className=".landingPage__title landingPage__title--1">Don't miss out important moments.</h1>
          <h1 className=".landingPage__title landingPage__title--1">Chat with your old friends.</h1>
          <h1 className=".landingPage__title landingPage__title--1">Meet new ones.</h1>
        </div>
          <button className="landingPage__button"><Link to="/login">Start Chatting</Link></button>
      </div>
    </div>
  )
}
 
 
 
export default Landing;
 