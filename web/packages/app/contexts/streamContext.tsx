import React, { createContext } from "react"
import { Channel, StreamChat } from "stream-chat"
import { ThreadContextValue } from "stream-chat-expo"

export const streamContext = createContext<{
  client: StreamChat<any>
  clientReady: boolean
  channel: Channel<any>
  setChannel: React.Dispatch<React.SetStateAction<any>>
  thread: ThreadContextValue<any>
  setThread: React.Dispatch<React.SetStateAction<any>>
}>({
  client: undefined,
  clientReady: false,
  channel: undefined,
  setChannel: undefined,
  thread: undefined,
  setThread: undefined,
})
