import React, { useState } from 'react'
import './Sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import RecentChats from '../MainScreen/RecentChats';
import Friends from '../MainScreen/Friends';
 
 
 
const Sidebar = (props) => {

    const [search, setSearch] = useState(""); //Search bar
    
    return (
        <>
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
                <Friends search={search} />
                </div>
            </div>
        </>
    )
}
 
 
 
export default Sidebar;
 