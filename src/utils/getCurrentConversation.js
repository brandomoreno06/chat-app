const getCurrentConversation = (user, conversations, conversationDetails, recentChats, params, dispatch) => {
    //if there is an existing conversation
    if (conversations.includes(params.id)) {
        const currentConversation = conversationDetails.find((conversation) => {
            return conversation.id === params.id
        })

        const otherUserDetail = recentChats.find((chatUser) => {
            const otherUser = currentConversation?.members.find((member) => member !== user.id )
            return chatUser.uid === otherUser;
        });

        dispatch({
            type: "GET_CURRENT_CONVERSATION",
            currentConversation: otherUserDetail,
        })
    }
}


export default getCurrentConversation;