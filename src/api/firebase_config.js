
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration (from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDimkbPSQV-OEWMlD8fOUhmehpLNZNHzZ4",
    authDomain: "weddingproject-phebeeliot.firebaseapp.com",
    projectId: "weddingproject-phebeeliot",
    storageBucket: "weddingproject-phebeeliot.appspot.com",
    messagingSenderId: "1014467695872",
    appId: "1:1014467695872:web:d7757e1197a9d3abfa0fe5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database)
const db = getFirestore(app);

export { db };