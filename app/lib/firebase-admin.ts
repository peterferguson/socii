import admin from "firebase-admin"

// * Constant initialisation
if (!admin.apps.length) admin.initializeApp()

const firestore = admin.firestore()
const auth = admin.auth()

export { firestore, auth }
