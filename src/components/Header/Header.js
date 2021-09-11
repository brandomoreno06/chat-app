import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileMenu from './ProfileMenu';

 
const Header = (props) => {
    const [{ user }] = useStateValue();

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
                        <ProfileMenu />
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
            </div>
        </div>
    )
}
 
 
 
export default Header;
 