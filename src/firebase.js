import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Make sure to import getStorage


const firebaseConfig = {
    apiKey: "AIzaSyBK7nQrIdq20Y6JywAOcF0_lPl0UDHQYPM",
    authDomain: "second-trial-f7db8.firebaseapp.com",
    databaseURL: "https://second-trial-f7db8-default-rtdb.firebaseio.com",
    projectId: "second-trial-f7db8",
    storageBucket: "second-trial-f7db8.appspot.com",
    messagingSenderId: "99021112195",
    appId: "1:99021112195:web:ed3ae973239f04bef2ecb6",
    measurementId: "G-ETHVXVKS0F"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); // Initialize Firebase Storage

export { auth ,firestore, storage };
