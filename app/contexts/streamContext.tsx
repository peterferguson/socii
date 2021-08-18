/// <reference path="./stream.d.ts" />
import { useAuth } from "@hooks/useAuth"
import { useStreamClient } from "@hooks/useStreamClient"
import React, { createContext } from "react"

export const streamContext = createContext({ client: undefined }) as any

export const StreamProvider: React.FC = ({ children }) => {
  const { client } = useStreamClient()
  return <streamContext.Provider value={{ client }}>{children}</streamContext.Provider>
}
