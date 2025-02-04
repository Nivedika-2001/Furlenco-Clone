import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyVJIGDl1syN-Z5N1kq_7RV4h_dYRCCQM",
  authDomain: "otpdemo-96de7.firebaseapp.com",
  projectId: "otpdemo-96de7",
  storageBucket: "otpdemo-96de7.appspot.com",
  messagingSenderId: "433570496681",
  appId: "1:433570496681:web:6eba10e43f58cee691e9b8",
  measurementId: "G-T6YYZMF4MP"
};

 const app = initializeApp(firebaseConfig);
 export const authentication = getAuth(app);
// export default app;

// firebase.initializeApp(firebaseConfig);
// let auth = firebase.auth();
// export { auth, firebase };