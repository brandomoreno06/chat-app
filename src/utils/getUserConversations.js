import db from "../firebase";

const getUserConversations = (user, dispatch) => {
    if(user) {
        const usersCollection = db.collection("users");
        const currentUser = usersCollection.where("uid", "==", user.uid).limit(1);

        currentUser.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dispatch({
                    type: "GET_CONVERSATIONS",
                    conversations: doc.data().conversations,
                })
            });
        })
    }
}

export default getUserConversations;