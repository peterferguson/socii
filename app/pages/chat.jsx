import { AuthCheck, ClientOnly } from "@components"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { ChatContext } from "stream-chat-react"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

export default function Chat() {
  const { client } = useContext(ChatContext)
  return (
    <AuthCheck>
      <ClientOnly>{client && <StreamChatWithNoSSR client={client} />}</ClientOnly>
    </AuthCheck>
  )
}
