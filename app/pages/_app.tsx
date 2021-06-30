import Footer from "@components/Footer"
import Head from "@components/Head"
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

  return (
    <UserContext.Provider value={userData}>
      <StreamContext.Provider value={{ client }}>
        <Head />
        {!userData.user && <PromotionBanner />}
        {router.asPath === "/" ? (
          <>{isBrowser && <Component {...props} />}</>
        ) : (
          <ComponentContainer {...props} user={userData.user}>
            {isBrowser && <SearchCard {...props} />}
            {isBrowser && <Component {...props} />}
            {is1Col && <Footer {...props} />}
          </ComponentContainer>
        )}
        <Toaster {...toastProps} />
      </StreamContext.Provider>
    </UserContext.Provider>
  )
}

const ComponentContainer = (props) => (
  <main
    className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl selection:bg-lightTeal/80 selection:text-teal-900"
    {...props}
  >
    <Chat client={props.client} theme={`messaging ${props.theme}`}>
      <MainLayout {...props} />
    </Chat>
  </main>
)

function MainLayout(props) {
  const { client } = useContext(ChatContext)
  const router = useRouter()
  const isChatRoute = router.pathname.includes("/chat")
  const is2Col = !useMediaQuery({ minWidth: 1024 })

  return (
    <div className="flex items-start justify-between">
      <Sidebar />
      <div className="flex flex-col w-full pl-0 sm:p-4 sm:space-y-4">
        <NavHeader user={props.user} setShowSearchCard={props.setShowSearchCard} />
        <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto sm:pt-0 sm:pr-0 sm:pl-0">
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

const PromotionBanner = () => (
  <div className="w-full h-20 p-4 text-sm text-center text-white align-middle bg-gradient-to-r to-brand from-teal-400 font-work-sans leading-6 sm:leading-0 sm:text-lg">
    👋 socii is currently in private pre-alpha mode.
    <div className="-mt-1">You will need an invite!</div>
  </div>
)
