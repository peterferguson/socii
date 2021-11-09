import { doc, getDoc } from "firebase/firestore"
import { db } from ".."

export const getGroupData = async (groupName: string) =>
  getDoc(doc(db, `groups/${groupName}`)).then(snap => snap.data())
