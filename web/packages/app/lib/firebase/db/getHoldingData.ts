import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore"
import React from "react"
import { db } from ".."

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */

export const getHoldingData = (
  groupName: string,
  setHoldings: React.Dispatch<React.SetStateAction<QueryDocumentSnapshot[]>>
) => {
  const holdingsRef = query(
    collection(db, `groups/${groupName}/holdings`),
    where("qty", "!=", 0)
  )
  const unsubscribe = onSnapshot(holdingsRef, snap => setHoldings(snap.docs))

  return unsubscribe
}
