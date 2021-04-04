import firebase from "firebase/app";

import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions
const firebaseConfig = {
  apiKey: "AIzaSyA788-c-k_ZA-F2SMGcQxBXC4JAwE-2ruo",
  authDomain: "facebook-clone-336b5.firebaseapp.com",
  projectId: "facebook-clone-336b5",
  storageBucket: "facebook-clone-336b5.appspot.com",
  messagingSenderId: "583498807562",
  appId: "1:583498807562:web:fd13a4a021c4ae49e5e2f3",
  measurementId: "G-57C83ZHE49",
};

export const fire = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const dataBase = firebase.firestore();

export const date = firebase.firestore.FieldValue;
