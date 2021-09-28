import { FooterDynamic } from "@components/Footer"
import NavHeader from "@components/NavHeader"
import { useStreamClient } from "@hooks/useStreamClient"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { StreamApp } from "react-activity-feed"
import { useMediaQuery } from "react-responsive"
import { Chat } from "stream-chat-react"

const Sidebar = dynamic(() => import("@components/Sidebar"))

const MainLayout = ({ children }) => {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const router = useRouter()
  const isChatRoute = router.asPath?.includes("/chat")
  const theme = "light"

  const { token, chatClient, userFeed } = useStreamClient()

  // TODO: Add default component sizes
  // 1, 2, 3, 4 column components
  // - Something like a <FourColumnComponent>{props.children}</FourColumnComponent>

  useEffect(() => {
    const followUser = async () => {
      const response = await userFeed?.following({
        offset: 0,
        limit: 1,
        filter: ["user:eric"],
      })
      if (response?.results.length === 0) {
        await userFeed?.follow("user", "eric")
      }
    }
    followUser()
  }, [userFeed])

  return (
    <div className="w-full h-full grid grid-cols-8">
      <NavHeader />
      <div className="col-span-1">{!is1Col && <Sidebar />}</div>
      {userFeed && chatClient && (
        <StreamApp
          apiKey={process.env.NEXT_PUBLIC_STREAM_API_KEY}
          appId={process.env.NEXT_PUBLIC_STREAM_APP_ID}
          token={token}
        >
          <Chat client={chatClient} theme={`messaging ${theme}`}>
            <main
              className="p-4 overflow-x-hidden overflow-y-scroll mt-14 sm:mt-20 standalone:pb-safe-bottom standalone:pt-safe-top sm:space-y-4 col-span-8 sm:col-span-7 no-scrollbar"
              style={{ paddingBottom: is1Col ? "5rem" : "1rem" }}
            >
              <div className="flex flex-col items-center justify-center mx-4 sm:flex-row">
                {children}
              </div>
            </main>
          </Chat>
        </StreamApp>
      )}
      {!isChatRoute && <FooterDynamic />}
    </div>
  )
}

export default MainLayout
