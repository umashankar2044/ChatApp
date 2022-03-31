import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPCsmbERQz3GoWx9JC1-BsknLpMjUsKgY",
  authDomain: "groupchat-30f16.firebaseapp.com",
  databaseURL: "https://groupchat-30f16-default-rtdb.firebaseio.com",
  projectId: "groupchat-30f16",
  storageBucket: "groupchat-30f16.appspot.com",
  messagingSenderId: "731942771911",
  appId: "1:731942771911:web:35c5c8f8d179039ac6f2e2"
};


const app = initializeApp(firebaseConfig);
export default app;