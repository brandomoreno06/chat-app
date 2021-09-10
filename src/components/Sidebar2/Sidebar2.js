import React, { useState } from 'react'
import './Sidebar2.css';
import { useStateValue } from '../../context/UserState';
import Friends from '../Sidebar/Friends';
import SearchIcon from '@material-ui/icons/Search';
 
 
 
const Sidebar2 = (props) => {
  const [{ usersList }] = useStateValue();
  const [search, setSearch] = useState(""); //Search bar

  return (
    <div className="sidebar__container sidebar__container--2">
        <div className="sidebar">
            <div className="sidebar__search">
                <input
                    type="text"
                    className="sidebar__searchInput"
                    placeholder="Search Community"
                    value= {search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                />
                <SearchIcon className="sidebar__searchIcon" />
            </div>
            <h2 className="friends__header">Discover People</h2>
            <Friends className="sidebar2__community" search={search} appUsers={usersList} />
        </div>
    </div>
    )
}
 
 
 
export default Sidebar2;