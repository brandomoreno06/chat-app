import db from "./firebase";



const getMessages = (params, conversations, dispatch) => {
    //verify first if params[id] is part of user's conversation
    if (conversations.includes(params.id)) {
        const conversationMessagesRef = db.collection(`messages/${params.id}/conversation_messages`);

        conversationMessagesRef.orderBy('sentAt').onSnapshot((doc) => {
            const messages = doc.docs.map((message) => { return message.data() })
            dispatch({
                type: "GET_CURRENT_MESSAGES",
                currentMessages: messages,
            })
            console.log(messages)
        })
    }
}


export default getMessages;