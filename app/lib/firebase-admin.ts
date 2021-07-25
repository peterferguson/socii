import admin from "firebase-admin"

// * Constant initialisation
if (!admin.apps.length) admin.initializeApp()

const firestore = admin.firestore()
const auth = admin.auth()

const arrayUnion = admin.firestore.FieldValue.arrayUnion
const fromDate = admin.firestore.Timestamp.fromDate

export { firestore, auth, arrayUnion, fromDate }
