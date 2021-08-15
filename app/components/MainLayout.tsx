import NavHeader from "@components/NavHeader"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useMediaQuery } from "react-responsive"
import { ChatContext } from "stream-chat-react"

const Sidebar = dynamic(() => import("@components/Sidebar"))

const StreamChatWithNoSSR = dynamic(() => import("stream/components/Chat"), {
  ssr: false,
})

export default function MainLayout(props) {
  const { client } = useContext(ChatContext)
  const router = useRouter()
  const isChatRoute = router.asPath?.includes("/chat")
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const is2Col = !useMediaQuery({ minWidth: 1024 })

  // TODO: Add default component sizes
  // 1, 2, 3, 4 column components
  // - Something like a <FourColumnComponent>{props.children}</FourColumnComponent>

  return (
    <div className="flex items-start">
      {!is1Col && <Sidebar />}
      <div className="flex flex-col items-start w-full h-screen px-1 sm:py-2 sm:space-y-4">
        {!(is1Col && isChatRoute) && <NavHeader />}
        {/* Main Components */}
        <div className="w-full h-full overflow-auto no-scrollbar">
          <div className="flex flex-col flex-wrap mx-4 sm:flex-row">
            {props.children}
            {client?.user && props.showActiveChannel && !is2Col && !isChatRoute && (
              <StreamChatWithNoSSR {...props} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
