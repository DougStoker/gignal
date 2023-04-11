//import * as firebase from "firebase"
import "firebase/auth"
import {getAuth} from "firebase/auth"
import "firebase/firestore"
//import getFirestore from "firebase/firestore"

//import "firebase/app"
import { getApps, initializeApp , getApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
//console.log(getFirestore.toString())

const firebaseConfig = {
    apiKey: "AIzaSyAh8YfcmcOhDjXoBBdVyS7aZPqqDeiCozQ",
    authDomain: "gignal-signalclone.firebaseapp.com",
    projectId: "gignal-signalclone",
    storageBucket: "gignal-signalclone.appspot.com",
    messagingSenderId: "758112709030",
    appId: "1:758112709030:web:c13ff6c9f11cd0d5c24767",
    measurementId: "G-2H7JGG6MF4"
  };

  let app
  //if (firebase.apps.length === 0){
  if (getApps().length === 0){
      //const firebaseApp = firebase.initializeApp(firebaseConfig)
    app = initializeApp(firebaseConfig)
  } else {
    //app = firebase.app()
    app = getApp()
  }

//const db = app.firestore()

const db = getFirestore(app)
//const auth = firebase.auth()
const auth = getAuth(app)

export {db, auth}


