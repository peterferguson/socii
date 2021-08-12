import User from "@models/User"
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
  setUserGroups: React.Dispatch<React.SetStateAction<string[]>>,
  setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  const userRef = doc(firestore, `users/${uid}`)
  const unsubscribe = onSnapshot(userRef, (doc) => {
    const { username, groups, alpacaAccountId, alpacaACH } = doc.data()
    setUsername(username)
    setUserGroups(groups)
    setUser((prevUser) => ({ ...prevUser, alpacaAccountId, alpacaACH }))
  })

  return unsubscribe
}
