// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Ambil dari file .env - JANGAN tulis langsung di sini!
// Buat file .env di root project dengan isi:
//
// VITE_FIREBASE_API_KEY=AIzaSyABdGrR7ZdTMlyrVd3wEssO-eUO_3qCJ6U
// VITE_FIREBASE_AUTH_DOMAIN=portfolio-db-56e3a.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=portfolio-db-56e3a
// VITE_FIREBASE_STORAGE_BUCKET=portfolio-db-56e3a.firebasestorage.app
// VITE_FIREBASE_MESSAGING_SENDER_ID=426328801796
// VITE_FIREBASE_APP_ID=1:426328801796:web:67391e9f0e629c76e9eb51
//
// Tambahkan .env ke .gitignore agar tidak ter-upload ke GitHub!

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
