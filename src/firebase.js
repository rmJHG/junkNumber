// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import {getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MASSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL : process.env.REACT_APP_DATABASE_URL
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const fireebaseDb = getDatabase(firebaseApp)

//로그인 유지관리(웹 종료시 기록삭제)
setPersistence(firebaseAuth, browserSessionPersistence);

