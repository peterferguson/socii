import { useProvideAuth } from "@hooks/useProvideAuth"
import React from "react"
import { authContext } from "./authContext"

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
