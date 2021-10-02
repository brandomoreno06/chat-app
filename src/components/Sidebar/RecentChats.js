import React from 'react'
import './RecentChats.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import { Link} from 'react-router-dom';
import { toggleSidebar } from '../../helpers/toggleSidebar';
 
 
const RecentChats = (props) => {
    const [{ user, conversationDetails, recentChats }] = useStateValue();
    const search = props.search; //search filter
    
    const chats = conversationDetails.map((detail) => {
        //find conversation member/s other than the current user
        const otherUser = detail.members.find((member) => member !== user.uid );
        const otherUserDetail = recentChats.find((user) => user.uid === otherUser);

        return {id: detail.id, otherUser: otherUserDetail}
    })

    return (
        <div className="recentChats">
            <h2 className="recentChats__header">Recent Chats</h2>

            {/* Community chat */}
            <Link to="/messages/community" key="community">
                <div 
                    className="recentChats__item"
                    id="community"
                    name="Community"
                    onClick={toggleSidebar}
                >
                    <Avatar className="recentChats__avatar"/>
                    <h4 className="recentChats__name">Community &#128293;&#128293;&#128293;</h4>
                </div>
            </Link>
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
                        onClick={toggleSidebar}
                    >
                        <Avatar className="recentChats__avatar"/>
                        <h4 className="recentChats__name">{chat.otherUser?.displayName.split(" ")[0]}</h4>
                    </div>
                </Link>
            ))}
        </div>
    )
}
 
 
 
export default RecentChats;
 