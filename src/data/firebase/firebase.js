import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDepskJo7hyZhQbX5rRAn6QUL6lTfqWnlA",
  authDomain: "dwec-df8f3.firebaseapp.com",
  projectId: "dwec-df8f3",
  storageBucket: "dwec-df8f3.appspot.com",
  messagingSenderId: "400172910771",
  appId: "1:400172910771:web:a702c40109c1ff3d1308c6",
  measurementId: "G-7GC6HF3T83",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// utils
const db = firebase.firestore();
export { db, firebase };
