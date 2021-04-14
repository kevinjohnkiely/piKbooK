import firebase from "firebase";
import "firebase/auth";

import "firebase/storage"

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_DATABASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_DATABASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_DATABASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_DATABASE_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(config);

export const storage = firebase.storage()

export const auth = firebase.auth();
export default firebase;
