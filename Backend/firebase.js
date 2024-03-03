// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc,getDocs } = require('firebase/firestore/lite');
// Replace the configuration object with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyASBkmDY8FEB7Ay5JzSebGdmQFv_C9PjbQ",
  authDomain: "my-notes-24fce.firebaseapp.com",
  projectId: "my-notes-24fce",
  storageBucket: "my-notes-24fce.appspot.com",
  messagingSenderId: "859838111701",
  appId: "1:859838111701:web:cb0f87a84ae2c41c05675c",
  measurementId: "G-EH3XWB72HT"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const appCollection = collection(firestore, 'notes'); 

module.exports= {
  collection,addDoc,getDocs,appCollection
}