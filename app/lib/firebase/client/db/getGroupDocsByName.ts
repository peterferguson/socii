import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "."

export const getGroupDocsByName = async (groupNames: string[]) =>
  await getDocs(
    query(collection(firestore, "groups"), where("groupName", "in", groupNames))
  )
