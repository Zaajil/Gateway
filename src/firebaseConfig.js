// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-ppFMxD_-79qEk4YbYJDg4VpUBFQmzak",
  authDomain: "gateway-b9fea.firebaseapp.com",
  projectId: "gateway-b9fea",
  storageBucket: "gateway-b9fea.appspot.com",
  messagingSenderId: "243869317848",
  appId: "1:243869317848:web:a068acaae6b382b5fd35ad",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, firestore, auth };
