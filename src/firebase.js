import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "YOUR_VALID_API_KEY",
  authDomain: "chord-spelling-master.firebaseapp.com",
  projectId: "chord-spelling-master",
  storageBucket: "chord-spelling-master.appspot.com",
  messagingSenderId: "YOUR_VALID_MESSAGING_SENDER_ID",
  appId: "YOUR_VALID_APP_ID",
  measurementId: "YOUR_VALID_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };