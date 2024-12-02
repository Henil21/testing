// src/app/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCl8vj_dcUJVyuTk05UFvaW0EjkrnitCUI",
  authDomain: "axamineblogs.firebaseapp.com",
  projectId: "axamineblogs",
  storageBucket: "axamineblogs.appspot.com",
  messagingSenderId: "112557180885",
  appId: "1:112557180885:web:b2fad91fd2f180e4acdf5c",
  measurementId: "G-PDDX4S00TD"

};



const app = initializeApp(firebaseConfig);  // Initialize Firebase
export const auth = getAuth(app);  // Initialize Firebase Auth
export const db = getFirestore(app);  // Initialize Firestore

export default app;
