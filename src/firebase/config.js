import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDGAHOnUg4CO_bhsLGGBN7QaDQMk71RDxQ",
    authDomain: "voyagesofvictora-6da32.firebaseapp.com",
    projectId: "voyagesofvictora-6da32",
    storageBucket: "voyagesofvictora-6da32.firebasestorage.app",
    messagingSenderId: "326949684079",
    appId: "1:326949684079:web:9c36f1c379b1bd1e73de9a",
    measurementId: "G-FHZ6N5LX8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional for donation tracking)
const analytics = getAnalytics(app);

// Initialize Firestore and Functions
export const db = getFirestore(app);
export const functions = getFunctions(app);
export { analytics };
export default app;