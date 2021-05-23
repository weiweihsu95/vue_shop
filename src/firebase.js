import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAxylU6vb0UEaBtZtLd2lbsKA5NihZG_3U",
    authDomain: "login-test1-9dcd6.firebaseapp.com",
    databaseURL: "https://login-test1-9dcd6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "login-test1-9dcd6",
    storageBucket: "login-test1-9dcd6.appspot.com",
    messagingSenderId: "753729519799",
    appId: "1:753729519799:web:0cd6f7c4c08d37feb00d32",
    measurementId: "G-726PW3TPK5"
};

  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export {fb,db}
