/// <reference path="./stream.d.ts" />
import React, { useState, useEffect } from "react"
import { useStreamClient } from "../hooks/useStreamClient"
import { streamContext } from "./StreamContext"

export const StreamProvider: React.FC = ({ children }) => {
  const { client } = useStreamClient()

  const [channel, setChannel] = useState()
  const [clientReady, setClientReady] = useState(false)
  const [thread, setThread] = useState()

  useEffect(() => {
    if (client) setClientReady(true)
    return () => setClientReady(false)
  }, [client])

  return (
    <streamContext.Provider
      value={{ client, clientReady, channel, setChannel, thread, setThread }}
    >
      {children}
    </streamContext.Provider>
  )
}
