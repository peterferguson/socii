import { AuthCheck, ClientOnly } from "@components"
import { useStream } from "@hooks/useStream"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

const ChatPage = () => {
  const { client } = useStream()
  return (
    <AuthCheck>
      <ClientOnly>
        {client?.userID ? (
          <StreamChatWithNoSSR client={client} />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full mx-auto">
            <Link href="/chat">
              <div className="text-3xl text-center underline cursor-pointer text-brand font-primary align-center">
                Something went wrong. Click here to try again.
              </div>
            </Link>
          </div>
        )}
      </ClientOnly>
    </AuthCheck>
  )
}

export default ChatPage
