import AuthCheck from "@components/AuthCheck"
import ClientOnly from "@components/ClientOnly"
import dynamic from "next/dynamic"
import React from "react"

const StreamChatWithNoSSR = dynamic(() => import("@components/stream/Chat"), {
  ssr: false,
})

export default function Chat({ client }) {
  return (
    <AuthCheck>
      <ClientOnly>{client && <StreamChatWithNoSSR client={client} />}</ClientOnly>
    </AuthCheck>
  )
}
