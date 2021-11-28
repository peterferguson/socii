import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../index"

/*
 * Gets a users/{uid} photo url using username
 * @param  {string} username
 */

export async function getUserPhotoURL(username: string): Promise<string> {
  return await (
    await getDocs(
      query(collection(db, "users"), where("username", "==", username), limit(1))
    )
  ).docs
    ?.pop()
    ?.data().photoUrl
}
