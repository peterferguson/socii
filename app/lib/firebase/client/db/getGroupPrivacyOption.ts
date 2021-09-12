import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { firestore } from "."

/*
 * Gets privacy setting for group
 * @param  {string} groupName
 */

export const getGroupPrivacyOption = async (
  groupName: string,
  setPrivacyOption: React.Dispatch<React.SetStateAction<number>>
) => {
  return onSnapshot(doc(firestore, `groups/${groupName}`), (snap) => {
    setPrivacyOption(snap.data()?.privacyOption)
  })
}
