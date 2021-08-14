import { AuthCheck, ClientOnly } from "@components"
import dynamic from "next/dynamic"
import React from "react"

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
