import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase"

export const groupNameExists = async (name: string) =>
  (
    await getDocs(
      query(collection(firestore, "groups"), where("groupName", "==", name))
    )
  ).empty
