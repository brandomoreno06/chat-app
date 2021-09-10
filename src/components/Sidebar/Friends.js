import React from 'react'
import './Friends.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import { Link, useParams} from 'react-router-dom';
import { v4 } from 'uuid';
import sortName from '../../helpers/sort';

 
 
const Friends = (props) => {
    const [{ conversationDetails }, dispatch] = useStateValue();
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

        sessionStorage.setItem('chat-app-currentConversation', e.currentTarget.getAttribute('name'))
    }


    return (
        <div className="friends friends--smallScreen">
            {sortName(
                props.appUsers.filter((user) => {
                    if (search?.trim() === "") return user;
                    return user?.displayName?.toLowerCase().includes(search?.trim().toLowerCase());
                })
            )
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
            ))
            }
        </div>
    )
}
 
 
 
export default Friends;
 