import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../.."

/*
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

export async function getUserWithUsername(username: string) {
  const usersRef = collection(db, "users")
  const userQuery = query(usersRef, where("username", "==", username), limit(1))
  const querySnapshot = await getDocs(userQuery)
  const userDoc = querySnapshot.docs?.pop()
  return userDoc
}
