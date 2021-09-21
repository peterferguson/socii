import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { firestore } from "."

/*
 * Gets data for group
 * @param  {string} groupName
 */

export const getGroupData = async (
  groupName: string,
  setPrivacyOption: React.Dispatch<React.SetStateAction<object>>
) => {
  return onSnapshot(doc(firestore, `groups/${groupName}`), (snap) => {
    setPrivacyOption(snap.data())
  })
}
