import AuthCheck from "@components/AuthCheck"
import ClientOnly from "@components/ClientOnly"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { ChatContext } from "stream-chat-react"

const StreamChatWithNoSSR = dynamic(() => import("@components/stream/Chat"), {
  ssr: false,
})

export default function ChatSidebar({ setShowActiveChannel }) {
  const { client } = useContext(ChatContext)

  // TODO: Fix chat styling in this view
  return (
    <div className="relative hidden h-screen my-4 mr-4 shadow-lg lg:block xl:w-96 w-[500px]">
      <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <h2 className="text-2xl font-thin text-transparent font-poppins bg-clip-text  bg-gradient-to-b from-brand to-brand-cyan">
            Chat
          </h2>
        </div>
        <AuthCheck>
          <ClientOnly>
            {client?.user && (
              <StreamChatWithNoSSR
                client={client}
                isSidebar={true}
                setShowActiveChannel={setShowActiveChannel}
              />
            )}
          </ClientOnly>
        </AuthCheck>
      </div>
    </div>
  )
}
