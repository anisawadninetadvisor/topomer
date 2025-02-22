// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAVi_PNG3PBsNMNf1vHITYVEzp5xF6qtDE",
  authDomain: "topomer.firebaseapp.com",
  projectId: "topomer",
  storageBucket: "topomer.firebasestorage.app",
  messagingSenderId: "311031680675",
  appId: "1:311031680675:web:298f61e620ec37a4b37916",
  measurementId: "G-ZP2ZCPD86H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}