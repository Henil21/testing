// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC17_3utm_r-RP6--ijQdHcepaVoQRWhRI",
    authDomain: "axamineai-d1481.firebaseapp.com",
    projectId: "axamineai-d1481",
    storageBucket: "axamineai-d1481.firebasestorage.app",
    messagingSenderId: "1024232239974",
    appId: "1:1024232239974:web:bd42f23cc402cc21cacea7",
    measurementId: "G-NFML6L13MM"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
