import FirebaseUser from "@models/FirebaseUser"
import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { firestore, getUserStreamToken } from "."

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */

export const setUserState = (
  uid: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setUserGroups: React.Dispatch<React.SetStateAction<string[]>>,
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser>>
) => {
  const userRef = doc(firestore, `users/${uid}`)
  const unsubscribe = onSnapshot(userRef, async (doc) => {
    const data = doc.data()

    const streamToken = await getUserStreamToken(uid)
    setUsername(data?.username || "")
    setUserGroups(data?.groups || [])
    setUser((prevUser) => ({
      ...prevUser,
      streamToken,
      fcmToken: data?.fcmToken || "",
      alpacaAccountId: data?.alpacaAccountId || "",
      alpacaACH: data?.alpacaACH || "",
    }))
  })

  return unsubscribe
}
