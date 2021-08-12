import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { firestore } from "../firebase"

export const usernameExists = async (name: string) =>
  (
    await getDocs(
      query(collection(firestore, "users"), where("username", "==", name), limit(1))
    )
  ).empty
