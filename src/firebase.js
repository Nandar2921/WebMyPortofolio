// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABdGrR7ZdTMlyrVd3wEssO-eUO_3qCJ6U",
  authDomain: "portfolio-db-56e3a.firebaseapp.com",
  projectId: "portfolio-db-56e3a",
  storageBucket: "portfolio-db-56e3a.firebasestorage.app",
  messagingSenderId: "426328801796",
  appId: "1:426328801796:web:67391e9f0e629c76e9eb51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };