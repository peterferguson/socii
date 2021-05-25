import { StreamContext } from "@lib/context"

import ClientOnly from "@components/ClientOnly"
import LoadingIndicator from "@components/LoadingIndicator"
import AuthCheck from "@components/AuthCheck"

import dynamic from "next/dynamic"
import React, { useContext} from "react"

const StreamChatWithNoSSR = dynamic(() => import("@components/stream/Chat"), {
  ssr: false,
})

export default function Chat() {
  const { streamClient } = useContext(StreamContext)
  
  console.log(streamClient);

  if (!streamClient?.userID) {
    return <LoadingIndicator />
  }

  return (
    <AuthCheck>
      <ClientOnly>
        <StreamChatWithNoSSR client={streamClient} />
      </ClientOnly>
    </AuthCheck>
  )
}
