import React from 'react'
import './Friends.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import { Link, useParams} from 'react-router-dom';
import { v4 } from 'uuid';

 
 
const Friends = (props) => {
    const [{ conversationDetails, friendsDetails }, dispatch] = useStateValue();
    const params = useParams();
    const search = props.search; //search filter

    const setCurrentConversation = (e) => {
        dispatch({
            type: "GET_CURRENT_CONVERSATION",
            currentConversation: { 
                uid: e.currentTarget.id,
                displayName: e.currentTarget.getAttribute('name'),
                photoURL: e.currentTarget.photourl
            }
        })
    }


    return (
        <div className="friends">
            <h2 className="friends__header">Friends</h2>

            {friendsDetails.filter((friend) => {
                if (search?.trim() === "") return friend;
                return friend?.displayName?.toLowerCase().includes(search?.trim().toLowerCase());
            })
            .map((friend) => (
                //Link to conversation ID if friend is included on existing conversations
                <Link 
                    to={`/messages/${conversationDetails.find(conversation => {
                        return conversation.members?.includes(friend.uid)})?.id || v4()}`}
                    key={friend.uid}            
                >
                    <div 
                        className="friend__item"
                        id={friend?.uid}
                        photourl={friend?.photoURL}
                        name={friend?.displayName}
                        onClick={setCurrentConversation}
                    >
                        <Avatar className="friend__avatar"/>
                        <h4 className="friend__name">{friend?.displayName}</h4>
                    </div>
                </Link>
            ))}
        </div>
    )
}
 
 
 
export default Friends;
 