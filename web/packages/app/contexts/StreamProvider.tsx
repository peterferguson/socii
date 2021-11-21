import React, { useEffect, useState } from "react"
import { useCreateStreamClient } from "../hooks/useCreateStreamClient"
import { StreamContext } from "./StreamContext"

export const StreamProvider: React.FC = ({ children }) => {
  const { client } = useCreateStreamClient()

  const [channel, setChannel] = useState()
  const [clientReady, setClientReady] = useState(false)
  const [thread, setThread] = useState()

  useEffect(() => {
    if (client) setClientReady(true)
    return () => setClientReady(false)
  }, [client])

  return (
    <StreamContext.Provider
      value={{ client, clientReady, channel, setChannel, thread, setThread }}
    >
      {children}
    </StreamContext.Provider>
  )
}
