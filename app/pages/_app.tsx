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
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster))
const SearchCard = dynamic(() => import("components/SearchCard"))

// - Uncomment to console log web vitals
// export function reportWebVitals(metric) {
//   console.log(metric)
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  const { streamClient } = useStream(
    userData.user?.uid,
    userData.username,
    userData.user?.displayName
  )
  const [showSearchCard, setShowSearchCard] = useState(false)
  // const scrollRef = useRef(null)
  // const { up, down } = useScrollDirection(scrollRef)
  // console.log("scroll: ", up)
  // console.log("scroll: ", down)

  // TODO: Scroll ref is not working! So cannot animate the nav Footer on scroll down

  const props = {
    ...pageProps,
    user: userData.user,
    showSearchCard,
    setShowSearchCard,
  }

  const is1Col = !useMediaQuery({ minWidth: 640 })

  return (
    <UserContext.Provider value={userData}>
      <StreamContext.Provider value={{ streamClient }}>
        <Head />
        {!userData.user && <PromotionBanner />}
        <ComponentContainer {...props} user={userData.user}>
          {/* {!is1Col && <Navigation {...props} />} */}
          {isBrowser && <SearchCard {...props} />}
          {isBrowser && <Component {...props} />}
          {is1Col && <Footer {...props} />}
        </ComponentContainer>
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
    <div className="flex items-start justify-between">
      <Sidebar />
      <div className="flex flex-col w-full pl-0 sm:p-4 sm:space-y-4">
        <NavHeader user={props.user} setShowSearchCard={props.setShowSearchCard} />
        <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto sm:pt-0 sm:pr-0 sm:pl-0">
          <div className="flex flex-col flex-wrap sm:flex-row">{props.children}</div>
        </div>
      </div>
      <ChatSidebar />
    </div>
  </main>
)

const PromotionBanner = () => (
  <div className="w-full h-20 p-4 text-sm text-center text-white align-middle bg-gradient-to-r to-brand from-teal-400 font-work-sans leading-6 sm:leading-0 sm:text-lg">
    👋 socii is currently in private pre-alpha mode.
    <div className="-mt-1">You will need an invite!</div>
  </div>
)
