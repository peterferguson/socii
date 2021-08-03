import { NavHeader, Sidebar } from "@components"
import ChatSidebar from "@stream/components/ChatSidebar"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { ChatContext } from "stream-chat-react"

const StreamChatWithNoSSR = dynamic(() => import("stream/components/Chat"), {
  ssr: false,
})

export default function MainLayout(props) {
  const { client } = useContext(ChatContext)
  const router = useRouter()
  const isChatRoute = router.pathname.includes("/chat")
  const is2Col = !useMediaQuery({ minWidth: 1024 })

  const [showChat, setShowChat] = useState(false)

  // TODO: Add default component sizes
  // 1, 2, 3, 4 column components
  // - Something like a <FourColumnComponent>{props.children}</FourColumnComponent>

  return (
    <div className="flex items-start">
      <Sidebar />
      <div className="flex flex-col items-start w-full pl-0 sm:pt-2 sm:px-2 sm:space-y-4">
        <NavHeader
          setShowSearchCard={props.setShowSearchCard}
          showChat={showChat}
          setShowChat={setShowChat}
        />
        {/* Main Components */}
        <div className="w-full h-full pt-2 pl-2 pr-2 overflow-auto sm:pt-0 sm:pr-0 sm:pl-0 no-scrollbar">
          <div className="flex flex-col flex-wrap sm:flex-row">
            {props.children}
            {client?.user && props.showActiveChannel && !is2Col && !isChatRoute && (
              <StreamChatWithNoSSR {...props} />
            )}
          </div>
        </div>
      </div>
      {showChat && <ChatSidebar {...props} />}
    </div>
  )
}
