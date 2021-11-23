import React from "react"
import { useProvideAuth } from "../hooks/useProvideAuth"
import { authContext } from "./AuthContext"

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
