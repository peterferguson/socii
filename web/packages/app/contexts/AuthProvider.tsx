import React from "react"
import { useProvideAuth } from "../hooks/useProvideAuth"
import { AuthContext } from "./authContext"

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
