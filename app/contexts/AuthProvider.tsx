import { useProvideAuth } from "@hooks/useProvideAuth"
import { getFCMToken } from "@lib/firebase/client/messaging"
import { isBrowser } from "@utils/isBrowser"
import React, { useEffect } from "react"
import { authContext } from "./authContext"

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  useEffect(() => {
    isBrowser && auth.user?.uid && getFCMToken(auth.user?.uid)
  }, [auth.user?.uid])
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
