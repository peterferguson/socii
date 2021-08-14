import { AuthCheck, ClientOnly } from "@components"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { ChatContext } from "stream-chat-react"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

const ChatPage = () => (
  <AuthCheck>
    <ClientOnly>
      <StreamChatWithNoSSR />
    </ClientOnly>
  </AuthCheck>
)

export default ChatPage
