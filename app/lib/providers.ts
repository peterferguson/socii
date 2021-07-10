import { UserContext } from "./context"
import React from "react"
import { useProvideAuth } from "./hooks"

export default function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>
}
