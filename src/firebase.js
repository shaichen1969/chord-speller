// src/Firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, setUserProperties } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNM5fM86rJOKVcChNmBOXtZ6ybxWWvnyI",
    authDomain: "chord-speller.firebaseapp.com",
    projectId: "chord-speller",
    storageBucket: "chord-speller.appspot.com",
    messagingSenderId: "785665438590",
    appId: "1:785665438590:web:227f1a322d015139dcf92f",
    measurementId: "G-KE3KX8Y6BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Set the app name as a user property
setUserProperties(analytics, { app_name: "Chord Spelling Master" });

export { app, analytics };