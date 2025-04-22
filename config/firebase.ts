// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf7KU2AhG8gVLGTd-fVsKZ93NFHclGskY",
  authDomain: "recipeapp-ec1fb.firebaseapp.com",
  projectId: "recipeapp-ec1fb",
  storageBucket: "recipeapp-ec1fb.firebasestorage.app",
  messagingSenderId: "492283910128",
  appId: "1:492283910128:web:c4e7188449d280f9422f35",
  measurementId: "G-WL4T08JYRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Vereinfachte Auth-Initialisierung ohne getReactNativePersistence
// (dies vermeidet Compiler-Fehler und Firebase-Warnungen)
const auth = getAuth(app);
console.log('Firebase Auth initialisiert - mit AsyncStorage in AuthContext');

const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  // Analytics nur im Browser initialisieren (nicht in SSR)
  analytics = getAnalytics(app);
}

// Wir verwenden nun einen Workaround mit AsyncStorage direkt im AuthContext
console.log('Firebase initialisiert (Persistenz mit eigenem AsyncStorage-Mechanismus)');

export { auth, db, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }; 