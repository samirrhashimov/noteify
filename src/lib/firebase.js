import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDI37ePX-s5JKXqO4r7o9UkQvOchaK4Hr8",
    authDomain: "notepad-linzaapp.firebaseapp.com",
    projectId: "notepad-linzaapp",
    storageBucket: "notepad-linzaapp.firebasestorage.app",
    messagingSenderId: "625884524445",
    appId: "1:625884524445:web:9bd53ef63f061e9abd0974",
    measurementId: "G-631HB9C9W5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
