// Import necessary Firebase modules
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore/lite');

// Load environment variables from the .env file
require('dotenv').config();

// Firebase configuration object with values from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore instance for database operations
const firestore = getFirestore(app);

// Define a collection reference for 'notes' in the Firestore database
const appCollection = collection(firestore, 'notes');

// Export necessary functions and references for use in other modules

module.exports= {
  collection,addDoc,getDocs,appCollection
}
