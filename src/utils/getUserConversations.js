import db from "./firebase";

const getUserConversations = (user, dispatch) => {
    const usersCollection = db.collection("users");
    const currentUser = usersCollection.where("uid", "==", user.id).limit(1);

    currentUser.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            dispatch({
                type: "GET_CONVERSATIONS",
                conversations: doc.data().conversations,
            })
        });
       
    })
}

export default getUserConversations;