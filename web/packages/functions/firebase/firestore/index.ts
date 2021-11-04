import admin from "firebase-admin"

// * Exportable utils
export const increment = admin.firestore.FieldValue.increment
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp
export type Timestamp = admin.firestore.Timestamp
export const Timestamp = admin.firestore.Timestamp
export const arrayUnion = admin.firestore.FieldValue.arrayUnion
export type UserInfo = admin.auth.UserInfo

export { getLatestEventId } from "./db/getLatestEventId"
export { storeEvents } from "./db/storeEvents"
