import React from 'react'
import './RecentChats.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import { Link} from 'react-router-dom';
 
 
const RecentChats = (props) => {
    const [{ user, conversationDetails, recentChats }] = useStateValue();
    const search = props.search; //search filter
    
    const chats = conversationDetails.map((detail) => {
        //find conversation member/s other than the current user
        const otherUser = detail.members.find((member) => member !== user.uid );
        const otherUserDetail = recentChats.find((user) => user.uid === otherUser);
        console.log({id: detail.id, otherUser: otherUserDetail})
        return {id: detail.id, otherUser: otherUserDetail}
    })

    const saveConversationID = (e) => { sessionStorage.setItem('chat-app-currentConversation', e.currentTarget.getAttribute('name'))}


    return (
        <div className="recentChats">
            <h2 className="recentChats__header">Recent Chats</h2>

            {chats?.filter((chat) => {
                if (search?.trim() === "") return chat;
                return chat.otherUser?.displayName?.toLowerCase().includes(search?.trim().toLowerCase());
            })
            .map((chat) => (
                //link to exiting chatID
                <Link to={`/messages/${chat?.id}`} key={chat.id}>
                    <div 
                        className="recentChats__item"
                        id={chat?.id}
                        name={chat.otherUser?.displayName}
                        onClick={saveConversationID}
                    >
                        <Avatar className="recentChats__avatar"/>
                        <h4 className="recentChats__name">{chat.otherUser?.displayName}</h4>
                    </div>
                </Link>
            ))}
        </div>
    )
}
 
 
 
export default RecentChats;
 