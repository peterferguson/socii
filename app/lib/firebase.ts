import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
// import "firebase/performance"

import toast from "react-hot-toast";

export const firebaseConfig = {
  apiKey: "AIzaSyD13i3isXoeOgerBKTdSae9pl4j1oBKoDg",
  authDomain: "sociiinvest.firebaseapp.com",
  projectId: "sociiinvest",
  storageBucket: "sociiinvest.appspot.com",
  messagingSenderId: "584929113403",
  appId: "1:584929113403:web:73fa9920cb14c1cc19b31e",
  measurementId: "G-F7JH023N5Q",
};

if (!firebase.apps.some(app => app.name_ == "[DEFAULT]")) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const recaptchaVerifier = firebase.auth.RecaptchaVerifier;
export const credentialWithLink = firebase.auth.EmailAuthProvider.credentialWithLink;
export const increment = firebase.firestore.FieldValue.increment;
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// Initialize Performance Monitoring and get a reference to the service
// export const perf = firebase.performance();

// Helper Functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}


// Get first name from firebase user
/**`
 * Convert a ticker symbol to ISIN using firebase docs
 * @param  {string} ticker
 */
export const userFirstName = (user) => user.displayName.split(" ")[0];

/**`
 * Gets a ticker/{isin} document ISIN by querying the ticker
 * @param  {string} ticker
 */
export async function tickerToISIN(ticker: string): string {
  const tickerRef = firestore.collection("tickers");
  const query = tickerRef.where("tickerSymbol", "==", ticker).limit(1);
  const tickerDoc = (await query.get()).docs[0];
  return tickerDoc.id;
}

export function signOut(router, firstname) {
  toast.dismiss();
  toast(`Bye for now ${firstname}!`, { icon: "👋" });
  auth.signOut();
  if (router) router.push("/enter");
}
