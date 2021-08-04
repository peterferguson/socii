// import "firebase/performance"
import { EmailAuthProvider, getAuth, RecaptchaVerifier } from "firebase/auth"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/functions"
import "firebase/compat/storage"

const londonRegion = "europe-west2"

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "sociiinvest.firebaseapp.com",
  projectId: "sociiinvest",
  storageBucket: "sociiinvest.appspot.com",
  messagingSenderId: "584929113403",
  appId: "1:584929113403:web:73fa9920cb14c1cc19b31e",
  measurementId: "G-F7JH023N5Q",
}

// if (!firebase.apps.length) firebase.initializeApp(process.env.FIREBASE_CONFIG)
let app: firebase.app.App
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export default firebase
export const auth = getAuth()
import { getFunctions, httpsCallable } from "firebase/functions"

const functions = getFunctions(app, londonRegion)
export const firestore = firebase.firestore()
// export const functions = firebase.app().functions(londonRegion)

// if (
//   process.env.NODE_ENV === "development" &&
//   "_delegate" in firestore &&
//   !firestore?.["_delegate"]._settings.host?.includes("local")
//   // ! Stops NextJS hot reloading from re-executing this code
// ) {
//   firestore.useEmulator("localhost", 8080)
//   functions.useEmulator("localhost", 5001)
// }

// - Utilities
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const recaptchaVerifier = RecaptchaVerifier
export const credentialWithLink = EmailAuthProvider.credentialWithLink
export const increment = firebase.firestore.FieldValue.increment
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion
export const fromDate = firebase.firestore.Timestamp.fromDate
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

// - Callable Functions
export const alphaVantageQuery = httpsCallable(functions, "alphaVantageQuery")
export const tradeSubmission = httpsCallable(functions, "tradeSubmission")
export const tradeConfirmation = httpsCallable(functions, "tradeConfirmation")

// - Types
export type DocumentReference = firebase.firestore.DocumentReference
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
export type DocumentData = firebase.firestore.DocumentData
export type FirebaseUserInfo = firebase.UserInfo

// Initialize Performance Monitoring and get a reference to the service
// export const perf = firebase.performance();
