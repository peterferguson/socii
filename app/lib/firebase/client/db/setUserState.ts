import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { firestore } from "../firebase"

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */

export const setUserState = (
  uid: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setUserGroups: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const userRef = doc(firestore, `users/${uid}`)
  const unsubscribe = onSnapshot(userRef, (doc) => {
    const { username, groups } = doc.data()
    setUsername(username)
    setUserGroups(groups)
  })

  return unsubscribe
}
