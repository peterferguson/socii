import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from ".";

/*
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

export async function getUserWithEmail(email: string) {
  const usersRef = collection(firestore, "users");
  const userQuery = query(usersRef, where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(userQuery);
  const userDoc = querySnapshot.docs?.pop();
  return userDoc;
}
