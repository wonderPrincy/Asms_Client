import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey:"AIzaSyDfaqM9bI-Tm8m5q9d8Sv7TfSp5LbFLpvs",// "Your Firebase API",
  authDomain:"stockmanagement-e08a1.firebaseapp.com",//"Your Firebase AuthDomain",
  databaseURL: "https://stockmanagement-e08a1.firebaseio.com",//"Your Firebase Database URL",
  projectId:"stockmanagement-e08a1",// "Your Firebase ProjectID",
  storageBucket: "stockmanagement-e08a1.appspot.com",//"Your Firebase StorageBucket Id",
  messagingSenderId: "895416883436",//"Your Firebase SenderId",
  appId:"1:895416883436:web:5e73d503e9c9de9f99adc9",//"Your Firebase APP Id"
  measurementId: "G-EF4VDFNDWD"
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const db = firebase.firestore();

export default app;
