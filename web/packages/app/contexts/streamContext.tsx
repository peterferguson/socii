import React, { createContext } from "react"
import { Stream } from "stream"
import { Channel } from "stream-chat"
import { ThreadContextValue } from "stream-chat-expo"

export const streamContext = createContext<{
  client: Stream
  clientReady: boolean
  channel: Channel
  setChannel: React.Dispatch<React.SetStateAction<any>>
  thread: ThreadContextValue
  setThread: React.Dispatch<React.SetStateAction<any>>
}>({
  client: undefined,
  clientReady: false,
  channel: undefined,
  setChannel: undefined,
  thread: undefined,
  setThread: undefined,
})
