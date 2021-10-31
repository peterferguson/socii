import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { db } from "../../index"

export const displayNameExists = async (name: string) =>
  (
    await getDocs(
      query(collection(db, "users"), where("displayName", "==", name), limit(1))
    )
  ).empty
