import firebase from "firebase/app"
import "firebase/storage"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
// import "firebase/performance"

import toast from "react-hot-toast"

export const firebaseConfig = {
  apiKey: "AIzaSyD13i3isXoeOgerBKTdSae9pl4j1oBKoDg",
  authDomain: "sociiinvest.firebaseapp.com",
  projectId: "sociiinvest",
  storageBucket: "sociiinvest.appspot.com",
  messagingSenderId: "584929113403",
  appId: "1:584929113403:web:73fa9920cb14c1cc19b31e",
  measurementId: "G-F7JH023N5Q",
}

const londonRegion = "europe-west2"

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore()
export const functions = firebase.app().functions(londonRegion)

if (
  process.env.NODE_ENV === "development" &&
  !firestore._delegate._settings.host?.includes("local")
  // ! Stops NextJS hot reloading from re-executing this code
) {
  firestore.useEmulator("localhost", 8080)
  functions.useEmulator("localhost", 5001)
}

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const recaptchaVerifier = firebase.auth.RecaptchaVerifier
export const credentialWithLink = firebase.auth.EmailAuthProvider.credentialWithLink
export const increment = firebase.firestore.FieldValue.increment
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const alphaVantageQuery = functions.httpsCallable("alphaVantageQuery")
export const tradeSubmission = functions.httpsCallable("tradeSubmission")
export const tradeConfirmation = functions.httpsCallable("tradeConfirmation")

// Initialize Performance Monitoring and get a reference to the service
// export const perf = firebase.performance();

// Helper Functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users")
  const query = usersRef.where("username", "==", username).limit(1)
  const userDoc = (await query.get()).docs?.[0]
  return userDoc
}

/**
 * Get first name from firebase user
 * @param  {string} ticker
 */
export const userFirstName = (user) => user.displayName.split(" ")?.[0]

/**
 * Gets a ticker/{isin} document ISIN by querying the ticker
 * @param  {string} ticker
 */
export async function tickerToISIN(ticker: string): Promise<string> {
  const tickerSymbol = ticker.toUpperCase()
  const tickerRef = firestore.collection("tickers")
  const query = tickerRef.where("tickerSymbol", "==", tickerSymbol).limit(1)
  const tickerDoc = (await query.get()).docs?.pop()
  return await tickerDoc.id
}

export function signOut(router, firstname) {
  toast.dismiss()
  toast(`Bye for now ${firstname}!`, { icon: "👋" })
  auth.signOut()
  if (router) router.push("/enter")
}
