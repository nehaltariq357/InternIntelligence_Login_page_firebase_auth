// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tumhara Firebase Config (Firebase Console se copy karo)
const firebaseConfig = {
  apiKey: "AIzaSyAEkEikLnWlBOnL69_IZWv9hgJgNpR1F-4",
  authDomain: "fir-authentication-e0fd9.firebaseapp.com",
  projectId: "fir-authentication-e0fd9",
  storageBucket: "fir-authentication-e0fd9.firebasestorage.app",
  messagingSenderId: "459697245389",
  appId: "1:459697245389:web:a4fbf906c1ef0187de2d84",
  measurementId: "G-V46FTDC5P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
