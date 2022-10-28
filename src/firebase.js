import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBpZmr3IKCdDQg04WdraxfIjb1Hn8ctKK4",
  authDomain: "segundo-parcial-111e9.firebaseapp.com",
  projectId: "segundo-parcial-111e9",
  storageBucket: "segundo-parcial-111e9.appspot.com",
  messagingSenderId: "496256583841",
  appId: "1:496256583841:web:3504a66545e2874af4c8e0"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app