import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDuBhYvq76lv-OTWxAZk9fLITXu2CP280A",
    authDomain: "mobile-project-maksuda.firebaseapp.com",
    projectId: "mobile-project-maksuda",
    storageBucket: "mobile-project-maksuda.appspot.com",
    messagingSenderId: "642860276906",
    appId: "1:642860276906:web:d595ea3a9e82bb268f04d3"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app();
  }
  
  const firestore = firebase.firestore(app);
  const auth = firebase.auth();
  const storage = firebase.storage();
  const db = firebase.database();
  
  export { firestore, auth, storage, db};