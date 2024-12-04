// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";  // Correct import for ref and get
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyDKULp2mpIMxyeGbjzKXOM76It97pLW4OM",
  authDomain: "isnek-dd1c3.firebaseapp.com",
  databaseURL: "https://isnek-dd1c3-default-rtdb.firebaseio.com/",
  projectId: "isnek-dd1c3",
  storageBucket: "isnek-dd1c3.firebasestorage.app",
  messagingSenderId: "672049202531",
  appId: "1:672049202531:web:e8b16e4c5443dc43967f56",
  measurementId: "G-09W902MR76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const rtdb = getDatabase(app);  // Initialize Realtime Database

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, rtdb, ref, get };  // Export ref and get here
