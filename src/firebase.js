// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApW4SJGPF7-1SzIB76HZx8fCyu6YBThzs",
  authDomain: "mailproject-5c142.firebaseapp.com",
  databaseURL: "https://mailproject-5c142-default-rtdb.firebaseio.com",
  projectId: "mailproject-5c142",
  storageBucket: "mailproject-5c142.appspot.com",
  messagingSenderId: "970824213915",
  appId: "1:970824213915:web:2ea851635e43a6c6b2ad3e",
  measurementId: "G-EB3VF6GGQH",
};

// Initialize Firebase
export const firebaseData = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseData);
