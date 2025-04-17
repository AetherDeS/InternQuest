// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCky7G0FqxPxf8xWzfw7UfUzpe_evD35YQ",
  authDomain: "fir-intern-db.firebaseapp.com",
  databaseURL: "https://fir-intern-db-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "fir-intern-db",
  storageBucket: "fir-intern-db.firebasestorage.app",
  messagingSenderId: "257116117763",
  appId: "1:257116117763:web:13d2dd974fff2a1756a736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getDatabase(app);

