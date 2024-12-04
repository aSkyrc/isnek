// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKULp2mpIMxyeGbjzKXOM76It97pLW4OM",
  authDomain: "isnek-dd1c3.firebaseapp.com",
  projectId: "isnek-dd1c3",
  storageBucket: "isnek-dd1c3.firebasestorage.app",
  messagingSenderId: "672049202531",
  appId: "1:672049202531:web:e8b16e4c5443dc43967f56",
  measurementId: "G-09W902MR76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };