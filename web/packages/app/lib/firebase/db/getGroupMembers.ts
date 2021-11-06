import { collection, getDocs, query } from "firebase/firestore"
import { db } from ".."

export const getGroupMembers = async (groupName: string) =>
  (await getDocs(query(collection(db, `groups/${groupName}/investors`)))).docs?.map(
    ({ id }) => id
  )
