import { useProvideAppContext } from "app/hooks/useProvideAppContext"
import React from "react"
import { AppContext } from "./AppContext"

export function AppContextProvider({ children }) {
  const value = useProvideAppContext()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
