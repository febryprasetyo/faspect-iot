// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_EVy789wLJrGzhW5m-JI1wNaJ8Sa9kDg",
  authDomain: "fastpec-oms.firebaseapp.com",
  databaseURL: "https://fastpec-oms-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fastpec-oms",
  storageBucket: "fastpec-oms.appspot.com",
  messagingSenderId: "1052042366648",
  appId: "1:1052042366648:web:295dc8cf3ca3b827e06e4d",
  measurementId: "G-1QP3VMSPT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const analytics = getAnalytics(app);
export const db = getFirestore(app)