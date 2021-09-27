import { collection, getDocs, query } from "firebase/firestore"
import { firestore } from "."

export const getGroupMembers = async (groupName: string) =>
  (
    await getDocs(query(collection(firestore, `groups/${groupName}/investors`)))
  ).docs?.map(({ id }) => id)
