import React from 'react'
import './ChatScreen.css';
import Messages from './Messages';
import CreateMessage from './CreateMessage';
import ChatScreenHeader from './ChatScreenHeader';
import { useParams } from 'react-router';
import { useStateValue } from '../../context/UserState';
import { Link } from 'react-router-dom';
 
 
 
const ChatScreen = (props) => {
  const params = useParams()
  const [{user}] = useStateValue();

  return (
    <div className="chatScreenContainer">
      { params.id ? 
        <div className="chatScreen">
          <ChatScreenHeader />
          <Messages />
          <CreateMessage />
        </div> :
        <div className="chatScreen__empty">
          <h2>Hello {user.displayName? user.displayName : ""}, this is your chat screen.</h2>
          <h2>
            Chat with 
            <Link to="/messages/community">
              community.
            </Link>
          </h2>
        </div>
      }
    </div>
  )
}
 
 
 
export default ChatScreen;
 