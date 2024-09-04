// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmhIEqc03jcYSH5WP5IpJgyHRrQkN66jI",
  authDomain: "ai-trip-planner-776ca.firebaseapp.com",
  projectId: "ai-trip-planner-776ca",
  storageBucket: "ai-trip-planner-776ca.appspot.com",
  messagingSenderId: "197403635438",
  appId: "1:197403635438:web:ef4dfa1bebe3ec00384dff",
  measurementId: "G-8D69QY406H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);