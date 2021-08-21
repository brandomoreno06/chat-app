import db from "./firebase";


const getConversationDetails = ( conversations, dispatch ) => {
    const conversationsCollection = db.collection('conversations');
    
    if (conversations.length > 0) {
        //find details of conversations included in array of conversations of current user object
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