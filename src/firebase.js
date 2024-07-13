// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdZCV8SV4-ZQrFYkaojm-1FsCBBWQ48OM",
  authDomain: "hackathon-8fe5d.firebaseapp.com",
  projectId: "hackathon-8fe5d",
  storageBucket: "hackathon-8fe5d.appspot.com",
  messagingSenderId: "666217351189",
  appId: "1:666217351189:web:49edb5100234c29477e61c",
  measurementId: "G-ZCE6P79BYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
