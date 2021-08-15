import { useStreamClient } from "@hooks/useStreamClient"
import { AuthCheck, ClientOnly } from "@components"
import dynamic from "next/dynamic"
import React from "react"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

const ChatPage = () => {
  const { client } = useStreamClient()
  return (
    <AuthCheck>
      <ClientOnly>
        <StreamChatWithNoSSR client={client} />
      </ClientOnly>
    </AuthCheck>
  )
}

export default ChatPage
