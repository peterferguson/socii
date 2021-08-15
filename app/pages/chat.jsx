import { useStreamClient } from "@hooks/useStreamClient"
import { AuthCheck, ClientOnly } from "@components"
import Link from "next/link"
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
        {client?.userID ? (
          <StreamChatWithNoSSR client={client} />
        ) : (
          <div className="flex flex-col items-center justify-center w-screen h-screen mx-auto">
            <Link href="/chat">
              
              <div className="text-3xl cursor-pointer text-center underline text-brand font-primary align-center">
                Something went wrong.
                Click here to try again.
              </div>
              
            </Link>
          </div>
        )}
      </ClientOnly>
    </AuthCheck>
  )
}

export default ChatPage
