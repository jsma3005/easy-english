import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCVZOM4ctIdRCu8FBkijT21J7Bt05WazYU",
    authDomain: "easy-english-e7865.firebaseapp.com",
    projectId: "easy-english-e7865",
    storageBucket: "easy-english-e7865.appspot.com",
    messagingSenderId: "658024992917",
    appId: "1:658024992917:web:77611ccdab8d4916d7cb9c"
};

export const fire = firebase;
firebase.initializeApp(firebaseConfig);