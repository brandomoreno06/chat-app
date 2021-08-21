import React from 'react';
import './MainScreen.css';
import RecentChats from './RecentChats';
import ChatScreen from './ChatScreen';
import Sidebar from '../Sidebar/Sidebar';


const MainScreen = (props) => {
  return (
    <div className="mainScreen">
      <Sidebar/>
      {/* <RecentChats /> */}
      <ChatScreen />
      {/* <Friends /> */}
      {/* <CreateMessage /> */}
    </div>
  )
}
 
 
 
export default MainScreen   ;
 