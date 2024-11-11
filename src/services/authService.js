import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Sign up new user
export const signUp = async (email, password, riotUsername, riotTagline) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save additional user info in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    riotUsername: riotUsername,
    riotTagline: riotTagline
  });
};

// Log in existing user
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};