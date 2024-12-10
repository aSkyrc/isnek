import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, update, onValue } from "firebase/database"; 
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
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
const rtdb = getDatabase(app);  // Initialize Realtime Database

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Use AsyncStorage as persistence
});

export { app, auth, rtdb, ref, get, set, update, onValue};
