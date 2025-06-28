// config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzhs8fGqHH-yjuL1tuvhLyi6_JFj2dxW0",
  authDomain: "iut-planner.firebaseapp.com",
  projectId: "iut-planner",
  storageBucket: "iut-planner.firebasestorage.app",
  messagingSenderId: "877498695925",
  appId: "1:877498695925:web:9a517e504fc07f1041c5bc",
  measurementId: "G-PQJDH9B0TH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };