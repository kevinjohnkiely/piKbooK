import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAEWNZR4MK5JDJIa1A3c10HKc9uO3lF6RU",
    authDomain: "pikbook-2021-fs.firebaseapp.com",
    projectId: "pikbook-2021-fs",
    storageBucket: "pikbook-2021-fs.appspot.com",
    messagingSenderId: "672145914642",
    appId: "1:672145914642:web:a740643d8b59aea7a3d1cb"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase