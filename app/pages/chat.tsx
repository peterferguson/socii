import ClientOnly from "@components/ClientOnly"
import { AuthCheck } from "@components/AuthCheck"
import { useStream } from "@hooks/useStream"
import dynamic from "next/dynamic"
import Link from "next/link"
import React, { useEffect } from "react"
import { getFCMToken } from "@lib/firebase/client/messaging"
import { useAuth } from "@hooks/useAuth"
import { isBrowser } from "@utils/isBrowser"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

const ChatPage = () => {
  const { client } = useStream()
  const { user } = useAuth()
  useEffect(() => {
    isBrowser && user?.uid && getFCMToken(user.uid)
  }, [user.uid])
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
