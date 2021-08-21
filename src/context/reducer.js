const initialState = {
    user: {id : "senderID"},
    conversations: [],
    conversationDetails: [],
    recentChats: [],
    currentMessages: [],
    currentConversation: null,
    friends: [],
    friendsDetails: []
}


const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {...state, user: action.user}
        case "GET_CONVERSATIONS":
            return {...state, conversations: action.conversations}
        case "GET_CONVERSATION_DETAILS":
            return {...state, conversationDetails: action.conversationDetails}
        case "GET_RECENT_CHATS":
            return {...state, recentChats: action.recentChats}
        case "GET_CURRENT_MESSAGES":
            return {...state, currentMessages: action.currentMessages}
        case "GET_CURRENT_CONVERSATION":
            return {...state, currentConversation: action.currentConversation}
        case "GET_FRIENDS":
            return {...state, friends: action.friends}
        case "GET_FRIENDS_DETAILS":
            return {...state, friendsDetails: action.friendsDetails}
        default: 
        return state;   
    }
}


export { initialState };
export default reducer;