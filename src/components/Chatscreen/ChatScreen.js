import React from 'react'
import './ChatScreen.css';
import Messages from './Messages';
import CreateMessage from './CreateMessage';
import ChatScreenHeader from './ChatScreenHeader';
 
 
 
const ChatScreen = (props) => {
  return (
    <div className="chatScreenContainer">
      <div className="chatScreen">
        <ChatScreenHeader />
        <Messages />
        <CreateMessage />
      </div>
    </div>
  )
}
 
 
 
export default ChatScreen;
 