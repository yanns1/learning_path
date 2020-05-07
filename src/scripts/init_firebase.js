// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmdK1aFJAA2X0I8pyAqFTaihgX20Hxxdo",
    authDomain: "learning-path-4d401.firebaseapp.com",
    databaseURL: "https://learning-path-4d401.firebaseio.com",
    projectId: "learning-path-4d401",
    storageBucket: "learning-path-4d401.appspot.com",
    messagingSenderId: "895085389554",
    appId: "1:895085389554:web:8a73841baa403950ac526b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();


export { firebase, db, auth }