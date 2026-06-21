// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC10Xnl0tScIfVAlynxJumHYWW0baztWzQ",
  authDomain: "al-alam-pool.firebaseapp.com",
  projectId: "al-alam-pool",
  storageBucket: "al-alam-pool.firebasestorage.app",
  messagingSenderId: "1047252542056",
  appId: "1:1047252542056:web:3658d4eba87038f31551dd",
  measurementId: "G-TGD0S9WE1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
