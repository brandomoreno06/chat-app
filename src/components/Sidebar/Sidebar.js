import React, { useState } from 'react'
import './Sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import RecentChats from './RecentChats';
import Friends from './Friends';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { useStateValue } from '../../context/UserState';
 
 
 
const Sidebar = () => {
    const [{ friendsDetails, usersList }] = useStateValue();
    const [search, setSearch] = useState(""); //Search bar
    const history = useHistory();
    
    const logout = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        history.push("/")
    }

    return (
        <div className="sidebar__container">
            <div className="sidebar">
                <div className="sidebar__search">
                    <input
                        type="text"
                        className="sidebar__searchInput"
                        placeholder="Search Chat / Friends"
                        value= {search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    /> 
                    <SearchIcon className="sidebar__searchIcon" />
                </div>

            <RecentChats search={search}/>
            <h2 className="friends__header">Friends</h2>
            <Friends search={search} appUsers={friendsDetails} />
            <h2 className="friends__header sidebar__community">Discover People</h2>
            <Friends className="sidebar__community" search={search} appUsers={usersList} />

            <button className="sidebar__logout" type="submit" onClick={logout}>Sign out</button>
            </div>
        </div>

    )
}
 
 
 
export default Sidebar;
 