// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSqrVpDKRkjJp4hmaNQtINUIQXkrIcias",
  authDomain: "expense-tracker-d99c2.firebaseapp.com",
  projectId: "expense-tracker-d99c2",
  storageBucket: "expense-tracker-d99c2.firebasestorage.app",
  messagingSenderId: "114880224023",
  appId: "1:114880224023:web:10cb4b793ec486e93d3552"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy

