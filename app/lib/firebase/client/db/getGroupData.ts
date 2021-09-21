import { doc, getDoc } from "firebase/firestore"
import { firestore } from "."

export const getGroupData = async (groupName: string) =>
  getDoc(doc(firestore, `groups/${groupName}`)).then((snap) => snap.data())
