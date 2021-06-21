import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyAaf2VM7CRezt_c8_fQLvUua8-1SbR3sxA",
//   authDomain: "letmeask-380d9.firebaseapp.com",
//   databaseURL: "https://letmeask-380d9-default-rtdb.firebaseio.com",
//   projectId: "letmeask-380d9",
//   storageBucket: "letmeask-380d9.appspot.com",
//   messagingSenderId: "489394238556",
//   appId: "1:489394238556:web:3f5f5ce1ee65de4130a299"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();