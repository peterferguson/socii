import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../.."

/*
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

export async function getUserWithUsername(username: string) {
  return (
    await getDocs(
      query(collection(db, "users"), where("username", "==", username), limit(1))
    )
  ).docs?.pop()
}
