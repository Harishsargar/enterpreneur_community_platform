import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Make sure to import getStorage

// old firbase cfg
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
// __________________________________________________


// const firebaseConfig = {    // this is of another account
//   apiKey: "AIzaSyBYFlE-M8ve8O99gouOrdg_IJ6IZh2O4PY",
//   authDomain: "second-firebase-ab88b.firebaseapp.com",
//   projectId: "second-firebase-ab88b",
//   storageBucket: "second-firebase-ab88b.appspot.com",
//   messagingSenderId: "79524841183",
//   appId: "1:79524841183:web:086561745eab9c6cdbcb6a",
//   measurementId: "G-JS1Y2LBH6L"
// };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); // Initialize Firebase Storage

export { auth ,firestore, storage };
