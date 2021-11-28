import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../index"

export const getGroupDocsByName = async (groupNames: string[]) =>
  await getDocs(
    query(collection(db, "groups"), where("groupName", "in", groupNames))
  )
