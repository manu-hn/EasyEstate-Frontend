// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: "easyestates-7c0d8.firebaseapp.com",
    projectId: "easyestates-7c0d8",
    storageBucket: "easyestates-7c0d8.appspot.com",
    messagingSenderId: "831426388796",
    appId: "1:831426388796:web:024b158dcd8e9a3e8c7439",
    measurementId: "G-Y215C7BRG1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
const analytics = getAnalytics(app);