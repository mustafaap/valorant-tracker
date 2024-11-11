import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "valoranttracker-265fe.firebaseapp.com",
  projectId: "valoranttracker-265fe",
  storageBucket: "valoranttracker-265fe.firebasestorage.app",
  messagingSenderId: "725849692597",
  appId: "1:725849692597:web:f2a7b7825b0d6c728ee1fc",
  measurementId: "G-424W1Y5B5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };