import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import React from "react"
import { firestore } from "../firebase"

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */

export const setHoldingData = (
  groupName: string,
  setHoldings: React.Dispatch<React.SetStateAction<QueryDocumentSnapshot[]>>
) => {
  const holdingsRef = query(
    collection(firestore, `groups/${groupName}/holdings`),
    where("shares", "!=", 0)
  )
  const unsubscribe = onSnapshot(holdingsRef, (snap) => setHoldings(snap.docs))

  return unsubscribe
}
