import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { db } from ".."

export const checkUsernameExists = async (name: string) =>
  (await getDocs(query(collection(db, "users"), where("username", "==", name)))).empty
