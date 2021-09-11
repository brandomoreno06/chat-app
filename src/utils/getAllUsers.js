import db from "../firebase"

const getAllUsers = ( user, dispatch ) => {
  if(user) {
    const usersPublicRef = db.collection("users_public")
    
    usersPublicRef.get()
    .then((querySnapshot) => {
        const usersList = querySnapshot.docs.map((user) => { 
          return user.data() 
        }).filter((filterUser) => { 
          return filterUser.uid !== user.uid
        })

        dispatch({
            type: "GET_USERS_LIST",
            usersList: usersList
        })
        console.log(usersList)
    })
  }
}


export default getAllUsers;