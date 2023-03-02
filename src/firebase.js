import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
// import {initializeApp} from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyBQESM8rH-wh-CxweG6TJhvW_Exiuq0cgU",
    authDomain: "internship-project-cd4a8.firebaseapp.com",
    databaseURL: "https://internship-project-cd4a8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "internship-project-cd4a8",
    storageBucket: "internship-project-cd4a8.appspot.com",
    messagingSenderId: "884607913704",
    appId: "1:884607913704:web:c33553375b555291bac35d"
};
const app = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const db = getDatabase(app);
console.log(db);
export const auth = getAuth();