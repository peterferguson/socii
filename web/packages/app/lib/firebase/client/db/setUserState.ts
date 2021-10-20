import FirebaseUser from "../../../../models/FirebaseUser"
import { doc, onSnapshot } from "firebase/firestore"
import React from "react"
import { db } from "../../index"
import { getUserStreamToken } from "./getUserStreamToken"

/*
 * Gets all data for `auth` object from users/{uid}
 * @param  {string} username
 */

export const setUserState = (
  uid: string,
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser>>
) => {
  const userRef = doc(db, `users/${uid}`)
  const unsubscribe = onSnapshot(userRef, async (doc) => {
    const data = doc.data()

    const streamToken = await getUserStreamToken(uid)
    if (process.env.NODE_ENV !== "production") console.log("stream token", streamToken)
    setUser((prevUser) => ({
      ...prevUser,
      streamToken,
      username: data?.username || "",
      groups: data?.groups || [],
      fcmToken: data?.fcmToken || "",
      alpacaAccountId: data?.alpacaAccountId || "",
      alpacaACH: data?.alpacaACH || "",
    }))
  })

  return unsubscribe
}
