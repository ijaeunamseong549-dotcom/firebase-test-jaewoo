// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🚫 무료 플랜에서는 Storage 사용 안함
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBECBsV16TDJ7OVyjqivXXA4XIEUmELxmk",
  authDomain: "react-da235.firebaseapp.com",
  projectId: "react-da235",
  storageBucket: "react-da235.appspot.com", // ← .app ❌ .appspot.com ✅
  messagingSenderId: "106652015723",
  appId: "1:106652015723:web:634dc75e0f115d3b6da52e",
  measurementId: "G-Z5CZZ146MC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
