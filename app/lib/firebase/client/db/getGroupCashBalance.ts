import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { firestore } from "."

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */

export const getGroupCashBalanceListener = async (
  groupName: string,
  setCashBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  return onSnapshot(doc(firestore, `groups/${groupName}`), (snap) => {
    setCashBalance(snap.data()?.cashBalance)
  })
}
