import db from "./firebase";



const getChatOtherUsers = ( user, conversationDetails, dispatch ) => {
    const users_publicCollection = db.collection('users_public');

    //check conversation members >> return NOT the current user
    const otherUsers = conversationDetails.map((detail) => {
        return detail.members.find((member) => member !== user.id )
    })

    if(otherUsers.length > 0) {
        //find user details where UID's are in the "otherUsers"
        const otherUsersRef =  users_publicCollection.where("uid", "in", otherUsers);
        otherUsersRef.get()
        .then((querySnapshot) => {
            const otherUsersList = querySnapshot.docs.map((otherUser) => { return otherUser.data() })
            dispatch({
                type: "GET_RECENT_CHATS",
                recentChats: otherUsersList,
            })
        })
    }
}

export default getChatOtherUsers;