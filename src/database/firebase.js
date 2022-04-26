import firebase from "firebase";

const firebaseApp = {
  apiKey: "AIzaSyAfNeyfwdIAtqf6WLryg6iZJdupgaDQhDE",
  authDomain: "add-employee-crud.firebaseapp.com",
  projectId: "add-employee-crud",
  storageBucket: "add-employee-crud.appspot.com",
  messagingSenderId: "379346426144",
  appId: "1:379346426144:web:0716a6f25b2c2305dedf45",
};

const app = firebase.initializeApp(firebaseApp);

const auth = app.auth();
const firestore = app.firestore();

export { auth, firestore };
