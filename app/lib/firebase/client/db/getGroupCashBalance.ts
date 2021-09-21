import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { firestore } from "."

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */
// FIXME: This is a bad implementation ... no need to send the dispatch, just return the listener

export const getGroupCashBalanceListener = async (
  groupName: string,
  setCashBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  return onSnapshot(doc(firestore, `groups/${groupName}`), (snap) => {
    setCashBalance(snap.data()?.cashBalance)
  })
}
