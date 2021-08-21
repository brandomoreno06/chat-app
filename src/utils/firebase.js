import firebase from "firebase";


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "chat-app-648b9.firebaseapp.com",
    projectId: "chat-app-648b9",
    storageBucket: "chat-app-648b9.appspot.com",
    messagingSenderId: "317851240307",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-1HEVQENKGH"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();



export default db;