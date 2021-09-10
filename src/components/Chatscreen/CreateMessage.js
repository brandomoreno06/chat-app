import React, { useRef, useState } from 'react'
import './CreateMessage.css';
import SendIcon from "@material-ui/icons/Send";
import db from '../../firebase';
import { useStateValue } from '../../context/UserState';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import createConversation from '../../utils/createConversation';

 

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
        //create new conversation if there is no existing conversation
        if (!conversations.includes(params.id)) {
            createConversation(user, currentConversation, params);
        }

        //add message document in messages collection
        const conversationMessagesRef = db.collection(`messages/${params.id}/conversation_messages`);
        conversationMessagesRef.doc().set({
            content: message,
            sender: user.uid,
            sentAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('message sent')
        })

        //update conversation document in conversations collection
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
 