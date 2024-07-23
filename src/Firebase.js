// src/Firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNM5fM86rJOKVcChNmBOXtZ6ybxWWvnyI",
    authDomain: "harmonic-ear-trainer.firebaseapp.com",
    projectId: "harmonic-ear-trainer",
    storageBucket: "harmonic-ear-trainer.appspot.com",
    messagingSenderId: "785665438590",
    appId: "1:785665438590:web:227f1a322d015139dcf92f",
    measurementId: "G-KE3KX8Y6BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };