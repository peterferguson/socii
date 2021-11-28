import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from ".."

export const checkGroupNameExists = async (name: string) =>
  (await getDocs(query(collection(db, "groups"), where("groupName", "==", name)))).empty
