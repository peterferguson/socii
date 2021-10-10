/// <reference path="./stream.d.ts" />
import { useStreamClient } from "@hooks/useStreamClient"
import React, { createContext } from "react"

export const streamContext = createContext({ client: undefined })

export const StreamProvider: React.FC = ({ children }) => {
  const { client } = useStreamClient()
  return <streamContext.Provider value={{ client }}>{children}</streamContext.Provider>
}
