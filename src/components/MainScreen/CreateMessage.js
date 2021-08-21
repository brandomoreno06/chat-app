import React, { useRef, useState } from 'react'
import './CreateMessage.css';
import SendIcon from "@material-ui/icons/Send";
import db from '../../utils/firebase';
import { useStateValue } from '../../context/UserState';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

 

const CreateMessage = (props) => {
    const [{ user, conversations, currentConversation }] = useStateValue();
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const textBox = useRef();
    const params = useParams();


    const inputMessage = (e) => {
        setMessage(e.target.innerHTML);
        e.target.innerHTML ? setDisabled(false) : setDisabled(true);
    }

    const sendMessage = () => {
        if (!conversations.includes(params.id)) {
            //Update user's conversation list if there is no existing conversation (new converrsation)
            const usersCollection = db.collection('users');
            const userRef = usersCollection.where("uid", "==", user.id);
            userRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    usersCollection.doc(doc.id).update({
                        conversations: firebase.firestore.FieldValue.arrayUnion(params.id),
                    }) 
                })
            })

            //update conversations collection if there is no existing conversation
            const conversationsCollection = db.collection("conversations");
            conversationsCollection.doc(params.id).set({
                id: params.id,
                members: [user.id, currentConversation.uid],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }

        //update messages collection
        const conversationMessagesRef = db.collection(`messages/${params.id}/conversation_messages`);
        conversationMessagesRef.doc().set({
            content: message,
            sender: user.id,
            sentAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('message sent')
        })

        db.collection('conversations').doc(params.id).update({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }) 


        textBox.current.innerHTML = "";
        setDisabled(true);
    }


    return (
        <div className="createMessage">
            <div
                className="createMessage__input"
                ref={textBox}
                contentEditable={true}
                spellCheck={false}
                onInput={inputMessage}
            >
            </div>

            <button
                type="submit"
                className="createMessage_sendButton"
                disabled={disabled}
                onClick={sendMessage}
            >
                <SendIcon className="sendButton"/>
            </button>
        </div>
    )
}
 
 
 
export default CreateMessage;
 