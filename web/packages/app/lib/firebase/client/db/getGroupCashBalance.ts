import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { db } from "../.."

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */
// FIXME: This is a bad implementation ... no need to send the dispatch, just return the listener

export const getGroupCashBalance = async (
  groupName: string,
  setCashBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  return onSnapshot(doc(db, `groups/${groupName}`), (snap) => {
    setCashBalance(snap.data()?.cashBalance)
  })
}
