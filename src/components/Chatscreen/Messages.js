import React, { useEffect, useRef } from 'react'
import './Messages.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import { useParams } from 'react-router-dom';
import getMessages from '../../utils/getMessages';
import getCurrentConversation from '../../utils/getCurrentConversation';
import parse from 'html-react-parser';
 

 
const Messages = (props) => {
    const [{ user, conversations, currentMessages, conversationDetails, recentChats, currentConversation }, dispatch] = useStateValue();
    // const [isLoading, setIsLoading] = useState(true);
    const messagesRef = useRef();
    const params = useParams();
 
    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current?.scrollHeight
    }, [currentMessages])


    useEffect(() => {
        if (!conversations.includes(params.id)) {
            dispatch({
                type: "GET_CURRENT_MESSAGES",
                currentMessages: [],
            })
        }else {
            getCurrentConversation(user, conversations, conversationDetails, recentChats, params, dispatch);
            getMessages(user, params, conversations, dispatch);
        }
    }, [conversations, params.id])


    return (
        <div className="messages" ref={messagesRef}>
            {currentMessages?.map((message, index) => (
                <div className={message.sender == user.uid ? "messageItem userMessage" : "messageItem"} key={index}>
                    <Avatar className="messageItem__photo"/>
                    <div className="messageItem__container">
                        <div className="messageItem__header">
                            <h4 className="messageItem__name">
                                {message.sender !== user.uid ?
                                currentConversation?.displayName || sessionStorage.getItem('chat-app-currentConversation') : 
                                message.sender}
                            </h4>
                            {/* <span>{new Date(message.timestamp?.toDate()).toLocaleString()}</span> */}
                        </div>
                        <div className="messageItem__content">{parse(message.content)}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
 
 
 
export default Messages;
 