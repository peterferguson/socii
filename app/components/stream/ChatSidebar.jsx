import AuthCheck from "@components/AuthCheck"
import ClientOnly from "@components/ClientOnly"
import LoadingIndicator from "@components/LoadingIndicator"
import { StreamContext } from "@lib/context"
import dynamic from "next/dynamic"
import React, { useContext } from "react"

const StreamChatWithNoSSR = dynamic(() => import("@components/stream/Chat"), {
  ssr: false,
})

export default function ChatSidebar() {
  const { streamClient } = useContext(StreamContext)

  // TODO: Fix chat styling in this view
  return (
    <div className="relative hidden h-screen my-4 mr-4 shadow-lg lg:block xl:w-96 w-[500px]">
      <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <div className="text-2xl font-thin font-poppins">Chat</div>
        </div>
        <AuthCheck>
          <ClientOnly>
            {!streamClient ? (
              <LoadingIndicator />
            ) : (
              <StreamChatWithNoSSR client={streamClient} isSidebar={true} />
            )}
          </ClientOnly>
        </AuthCheck>
      </div>
    </div>
  )
}
