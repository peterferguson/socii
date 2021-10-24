import React, { createContext } from "react"

export const streamContext = createContext<{
  client: any
  clientReady: boolean
  channel: any
  setChannel: React.Dispatch<React.SetStateAction<any>>
  thread: any
  setThread: React.Dispatch<React.SetStateAction<any>>
}>({
  client: undefined,
  clientReady: false,
  channel: undefined,
  setChannel: undefined,
  thread: undefined,
  setThread: undefined,
})
