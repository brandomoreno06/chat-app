import React, { useEffect } from 'react'
import './ChatScreenHeader.css';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Avatar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../context/UserState';
import getCurrentConversation from '../../utils/getCurrentConversation';
 
 
 
const ChatScreenHeader = () => {
    const [{ user, conversationDetails, recentChats, currentConversation }, dispatch] = useStateValue();
    const params = useParams();

    useEffect(() => {
        getCurrentConversation(user, conversationDetails, recentChats, params, dispatch)
    }, [params.id])
    
    const conversationName = currentConversation?.displayName || sessionStorage.getItem('chat-app-currentConversation')

    return (
        <div className="chatScreen__header">
            <div className="chatScreen__headerLeft">
                <Avatar className="chatScreen__headerAvatar" src={currentConversation?.photoURL} />
                <h2>{conversationName}{params.id == "community" ? ' 🔥🔥🔥' : "" }</h2>
            </div>
            <div className="chatScreen__headerRight">
                <CallIcon className="chatScreen__headerIcon" />
                <VideocamIcon className="chatScreen__headerIcon" />
            </div>
        </div>
    )
}

 
export default ChatScreenHeader;
 