import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD7CE_c1Mq4xFoh2Wq01FUpYH1LJJdYcOY",
    authDomain: "zeenoteit-f1bba.firebaseapp.com",
    projectId: "zeenoteit-f1bba",
    storageBucket: "zeenoteit-f1bba.appspot.com",
    messagingSenderId: "916460412158",
    appId: "1:916460412158:web:9332a75fb1d28af0dc19af",
    measurementId: "G-BHBSDWJFX9"
}

firebase.initializeApp(config);
var auth = firebase.auth();
export {auth , firebase};