import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from ".."

export const getGroupMembers = async (groupName: string) =>
  (
    await getDocs(
      query(
        collection(db, `groups/${groupName}/investors`),
        where("acceptedInvite", "==", true)
      )
    )
  ).docs?.map(({ id }) => id)
