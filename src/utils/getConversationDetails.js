import db from "../firebase";


const getConversationDetails = ( user, conversations, dispatch ) => {
    if (user && conversations.length > 0) {
        //conversations included in array of conversations of current user object
        const conversationsCollection = db.collection('conversations');
        const conversationsRef =  conversationsCollection.where("id", "in", conversations);
        conversationsRef.get()
        .then((querySnapshot) => {
            const details = querySnapshot.docs.map((conversation) => { return conversation.data() })
            dispatch({
                type: "GET_CONVERSATION_DETAILS",
                conversationDetails: details,
            })
            console.log(details)
        })
    }
}

export default getConversationDetails;