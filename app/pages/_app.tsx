import "react-file-utils/dist/index.css"
import Footer from "@components/Footer"
import Head from "@components/Head"
import Navigation from "@components/Navigation"
import NavHeader from "@components/NavHeader"
import Sidebar from "@components/Sidebar"
import ChatSidebar from "@components/stream/ChatSidebar"
import { toastProps } from "@lib/constants"
import { StreamContext, UserContext } from "@lib/context"
import { useStream, useUserData } from "@lib/hooks"
import "@styles/Chat.css"
import "@styles/globals.css"
import { isBrowser } from "@utils/helper"
import { AppProps } from "next/app"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useContext, useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { Chat, ChatContext } from "stream-chat-react"

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: true,
})

const SearchCard = dynamic(() => import("components/SearchCard"), { ssr: true })

const StreamChatWithNoSSR = dynamic(() => import("components/stream/Chat"), {
  ssr: false,
})

// - Uncomment to console log web vitals
// export function reportWebVitals(metric) {
//   console.log(metric)
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  const { streamClient: client } = useStream(
    userData.user?.uid,
    userData.username,
    userData.user?.displayName
  )
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [showSearchCard, setShowSearchCard] = useState(false)
  const [showActiveChannel, setShowActiveChannel] = useState(false)

  // const scrollRef = useRef(null)
  // const { up, down } = useScrollDirection(scrollRef)
  // console.log("scroll: ", up)
  // console.log("scroll: ", down)

  // TODO: Scroll ref is not working! So cannot animate the nav Footer on scroll down

  const theme = "light" // TODO: Set up localStorage cache of this and allow for change in settings

  const props = {
    ...pageProps,
    user: userData.user,
    client,
    showSearchCard,
    setShowSearchCard,
    showActiveChannel,
    setShowActiveChannel,
    theme,
  }

  const router = useRouter()

  useEffect(() => {
    if (showActiveChannel) {
      setShowActiveChannel(!showActiveChannel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const nonStandardLayoutRoutes = ["/", "/enter"]

  const notMainLayout = nonStandardLayoutRoutes.includes(router.asPath)

  return (
    <UserContext.Provider value={userData}>
      <StreamContext.Provider value={{ client }}>
        <main
          className={`min-h-screen no-scrollbar
          relative overflow-x-hidden overflow-y-scroll bg-gray-100 dark:bg-gray-800 
          ${notMainLayout ? "" : "h-screen max-h-screen"}
          rounded-2xl selection:bg-brand-lightTeal/80 selection:text-teal-900`}
        >
          <Head />
          <>
            {notMainLayout ? (
              <>
                <Navigation {...props} />
                <Component {...props} />
              </>
            ) : (
              <ComponentContainer {...props} user={userData.user}>
                {isBrowser && <SearchCard {...props} />}
                {isBrowser && <Component {...props} />}
                {is1Col && <Footer {...props} />}
              </ComponentContainer>
            )}
          </>
          <Toaster {...toastProps} />
        </main>
      </StreamContext.Provider>
    </UserContext.Provider>
  )
}

const ComponentContainer = (props) => (
  <Chat client={props.client} theme={`messaging ${props.theme}`}>
    <MainLayout {...props} />
  </Chat>
)

function MainLayout(props) {
  const { client } = useContext(ChatContext)
  const router = useRouter()
  const isChatRoute = router.pathname.includes("/chat")
  const is2Col = !useMediaQuery({ minWidth: 1024 })

  return (
    <div className="flex items-start">
      <Sidebar />
      <div className="flex flex-col items-start w-full pl-0 sm:pt-2 sm:px-2 sm:space-y-4">
        <NavHeader user={props.user} setShowSearchCard={props.setShowSearchCard} />
        <div className="h-full pt-2 pl-2 pr-2 overflow-auto sm:pt-0 sm:pr-0 sm:pl-0 no-scrollbar">
          <div className="flex flex-col flex-wrap sm:flex-row">
            {props.children}
            {client?.user && props.showActiveChannel && !is2Col && !isChatRoute && (
              <StreamChatWithNoSSR {...props} />
            )}
          </div>
        </div>
      </div>
      <ChatSidebar {...props} />
    </div>
  )
}
