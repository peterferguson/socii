import React from "react"
import { streamContext, userContext } from "./context"
import { useProvideAuth, useProvideStream } from "./hooks"

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <userContext.Provider value={auth}>{children}</userContext.Provider>
}

export function StreamProvider({ children }) {
  const auth = useProvideAuth()
  const stream = useProvideStream(auth.user?.uid, auth.username, auth.user?.name)
  return <streamContext.Provider value={stream}>{children}</streamContext.Provider>
}
