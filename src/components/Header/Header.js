import React from 'react'
import './Header.css';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import firebase from 'firebase';
import { useStateValue } from '../../context/UserState';
import MenuIcon from '@material-ui/icons/Menu';

 
const Header = (props) => {
    const [{ user }] = useStateValue();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        history.push("/")
    }

    const toggleSidebar = () => {
        const sidebar = document.querySelector(".sidebar__container");
        sidebar.classList.toggle("sidebar__container--hide");
    }

    return (
        <div className="header">
            <div className="header__left">
                <MenuIcon className="header__menuIcon" onClick={toggleSidebar}/>
                <h2>Chat App</h2>
            </div>
            <div className="header__middle">
                
            </div>
            <div className="header__right">
                {user ?
                    <>
                        <Avatar className="header__avatar header__icon" />
                        <h4>{user?.displayName}</h4>
                        <ExpandMoreOutlined className="header__icon" />
                    </> :
                    <>
                        <Link to="../login" className="headerOption">
                        <span>Log in</span>
                        </Link>
                        <Link to="./login" className="headerOption">
                            <span className="headerOption__signup">Sign up</span>
                        </Link>
                    </> 
                }
                
                <button className="login__signIn" type="submit" onClick={logout}>Sign out</button>
            </div>
           

            
        </div>
    )
}
 
 
 
export default Header;
 