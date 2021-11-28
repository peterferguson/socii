import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../index"

/*
 * Gets a users/{uid} username field with email
 * @param  {string} email
 */

export async function getUsernameWithEmail(email: string): Promise<string> {
  return await (
    await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)))
  ).docs
    ?.pop()
    ?.data().username
}
