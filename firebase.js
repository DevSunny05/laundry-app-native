// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBOG3C7Rdo30sRMqNhiTpe5bCzCrZw7iDY",
  authDomain: "laundry-app-e6951.firebaseapp.com",
  projectId: "laundry-app-e6951",
  storageBucket: "laundry-app-e6951.appspot.com",
  messagingSenderId: "921909006055",
  appId: "1:921909006055:web:9d79816655aa7472f69c42",
  measurementId: "G-MTX4W86JPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore()

export {auth,db}