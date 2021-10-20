import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../../index"

/*
 * Gets a users/{uid} username field with email
 * @param  {string} email
 */

export async function getUsernameWithEmail(email: string): Promise<string> {
  const usersRef = collection(db, "users")
  const userQuery = query(usersRef, where("email", "==", email), limit(1))
  const querySnapshot = await getDocs(userQuery)
  const userDoc = querySnapshot.docs?.pop()
  return userDoc?.data().username
}
