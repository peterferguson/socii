import admin from "firebase-admin"

if (!admin.apps.length) {
  // * Constant initialisation
  admin.initializeApp()
}

const firestore = admin.firestore()
const auth = admin.auth()

export { firestore, auth }
