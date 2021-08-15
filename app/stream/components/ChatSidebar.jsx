import AuthCheck from "@components/AuthCheck"
import ClientOnly from "@components/ClientOnly"
import dynamic from "next/dynamic"
import React from "react"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

// TODO: Fix chat styling in this view
const ChatSidebar = () => (
  <div
    className={`absolute mt-2 mr-4 shadow-lg bottom-8 right-2 lg:block xl:w-96 w-[500px]`}
  >
    <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
      <div className="flex items-center justify-center pt-6">
        <h2 className="text-2xl font-thin text-transparent font-primary bg-clip-text bg-gradient-to-b from-brand to-brand-cyan">
          Chat
        </h2>
      </div>
      <AuthCheck>
        <ClientOnly>
          <StreamChatWithNoSSR />
        </ClientOnly>
      </AuthCheck>
    </div>
  </div>
)

export default React.memo(ChatSidebar)
