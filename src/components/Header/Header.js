import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
 
 
 
const Header = (props) => {
    const user = {
        email: "user@email.com"
    }
    
    return (
        <div className="header">
            <div className="header__left">
                <img
                    className="header__logo"
                    src=""
                    alt=""
                />
                <h2>Chat App</h2>
            </div>
            <div className="header__middle">
                
            </div>
            <div className="header__right">
                {user ?
                    <>
                        <Avatar className="header__avatar header__icon" /*onClick={showSettings}*//>
                        <h4>{user?.email.split('@').shift()}</h4>
                        <ExpandMoreOutlined className="header__icon" /*onClick={showSettings}*//>
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
            {/* { displaySettings && 
                <div className="header__settings">
                    <span onClick={logout}>Log out</span>
                </div> 
            } */}
        </div>
    )
}
 
 
 
export default Header;
 