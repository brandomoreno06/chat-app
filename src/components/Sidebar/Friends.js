import React from 'react'
import './Friends.css';
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../context/UserState';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import sortName from '../../helpers/sort';
import { toggleSidebar } from '../../helpers/toggleSidebar';

 
 
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
        toggleSidebar()
    }

    const classes = props.className ? `${props.className} friends friends--smallScreen` : "friends friends--smallScreen"

    return (
        <div className={classes}>
            {sortName(
                props.appUsers.filter((user) => {
                    if (search?.trim() === "") return user;
                    return user?.displayName?.toLowerCase().includes(search?.trim().toLowerCase());
                })
            )
            .map((friend) => (
                //Link to conversation ID if friend is included on existing. Otherwise, generate new uid.
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

            { props.appUsers.length == 0 && <span className="friends_none">You don't have any friends yet.</span>}
        </div>
    )
}
 
 
 
export default Friends;
 