// Import the functions you need from the SDKs you need
// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  updatePassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { FieldValue, arrayUnion as arrUnion } from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

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
const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// var database = firebase.firestore();

const analytics = getAnalytics(app);
const auth = getAuth(app);
var db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  analytics,
  auth,
  addDoc,
  getDocs,
  collection,
  db,
  ref,
  doc,
  getDoc,
  setDoc,
  storage,
  query,
  where,
  arrUnion,
  deleteDoc,
  updateDoc,
  onSnapshot,
  uploadBytes,
  deleteObject,
  FieldValue,
  arrayUnion,
  updatePassword,
  setPersistence,
  getDownloadURL,
  uploadBytesResumable,
  browserSessionPersistence,
};
