import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkhfoI5bbXbW1ag3PACjO2c3zGc5qu5T8",
  authDomain: "chord-spelling-master.firebaseapp.com",
  projectId: "chord-spelling-master",
  storageBucket: "chord-spelling-master.appspot.com",
  messagingSenderId: "258056635792",
  appId: "1:258056635792:web:27d6a51d002595595e1f15",
  measurementId: "G-H19KCJM6B3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };