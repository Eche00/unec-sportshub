import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtB8f71Pi8w122LFi85g2PN8omsECSK9o",
    authDomain: "unec-sportshub.firebaseapp.com",
    projectId: "unec-sportshub",
    storageBucket: "unec-sportshub.firebasestorage.app",
    messagingSenderId: "542348920998",
    appId: "1:542348920998:web:71d01a5f18bbf14795cc67",
    measurementId: "G-SK3L9ZGVL7"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };