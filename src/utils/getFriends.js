import db from '../firebase';
 
 
const getFriends = (user, dispatch) => {
    if(user) {
        const usersCollection = db.collection("users");
        const currentUser = usersCollection.where("uid", "==", user.uid).limit(1);

        currentUser.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dispatch({
                    type: "GET_FRIENDS",
                    friends: doc.data().friends,
                })
            });
        })
    }
}
 


const getFriendsDetails = (user, friends, dispatch) =>{
    if (user && friends.length > 0) {
        const users_publicCollection = db.collection('users_public');
        const usersRef =  users_publicCollection.where("uid", "in", friends);
    
        usersRef.get()
        .then((querySnapshot) => {
            const friendsList = querySnapshot.docs.map((user) => { return user.data() })
            dispatch({
                type: "GET_FRIENDS_DETAILS",
                friendsDetails: friendsList,
            })
            console.log(friendsList)
        })
    }
}

 
export { getFriends, getFriendsDetails };