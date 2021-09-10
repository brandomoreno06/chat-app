import db from "../firebase";
import firebase from "firebase";

const createConversation = (user, receiver, params) => {
    //Update user's and receiver's conversation list if there is no existing conversation (new conversation)
    const usersCollection = db.collection('users');
    const userRef = usersCollection.where("uid", "in", [user.uid, receiver.uid]);
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
        members: [user.uid, receiver.uid],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}


export default createConversation;