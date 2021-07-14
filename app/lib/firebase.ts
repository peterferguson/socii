import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import "firebase/storage"
// import "firebase/performance"

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "sociiinvest.firebaseapp.com",
  projectId: "sociiinvest",
  storageBucket: "sociiinvest.appspot.com",
  messagingSenderId: "584929113403",
  appId: "1:584929113403:web:73fa9920cb14c1cc19b31e",
  measurementId: "G-F7JH023N5Q",
}

const londonRegion = "europe-west2"

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default firebase
export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore()
export const functions = firebase.app().functions(londonRegion)

// if (
//   process.env.NODE_ENV === "development" &&
//   "_delegate" in firestore &&
//   !firestore?._delegate._settings.host?.includes("local")
//   // ! Stops NextJS hot reloading from re-executing this code
// ) {
//   firestore.useEmulator("localhost", 8080)
//   functions.useEmulator("localhost", 5001)
// }

export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const recaptchaVerifier = firebase.auth.RecaptchaVerifier
export const credentialWithLink = firebase.auth.EmailAuthProvider.credentialWithLink
export const increment = firebase.firestore.FieldValue.increment
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion
export const fromDate = firebase.firestore.Timestamp.fromDate
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const alphaVantageQuery = functions.httpsCallable("alphaVantageQuery")
export const tradeSubmission = functions.httpsCallable("tradeSubmission")
export const tradeConfirmation = functions.httpsCallable("tradeConfirmation")

// - Types
export type DocumentReference = firebase.firestore.DocumentReference
export type DocumentData = firebase.firestore.DocumentData
export type FirebaseUserInfo = firebase.UserInfo

// Initialize Performance Monitoring and get a reference to the service
// export const perf = firebase.performance();
