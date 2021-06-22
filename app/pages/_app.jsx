import Head from "@components/Head"
import Footer from "@components/Footer"
import Navigation from "@components/Navigation"
import { toastProps } from "@lib/constants"
import { StreamContext, UserContext } from "@lib/context"
import { useStream, useUserData } from "@lib/hooks"
import { useMediaQuery } from "react-responsive"
import "@styles/globals.css"
import { isBrowser } from "@utils/helper"
import dynamic from "next/dynamic"
import React, { useState } from "react"
const Toaster = dynamic(() => import("react-hot-toast").then(mod => mod.Toaster))
const SearchCard = dynamic(() => import("components/SearchCard"))

export function reportWebVitals(metric) {
  console.log(metric)
}

export default function MyApp({ Component, pageProps }) {
  const userData = useUserData()
  const { streamClient } = useStream(
    userData.user?.uid,
    userData.username,
    userData.user?.displayName
  )
  const [showSearchCard, setShowSearchCard] = useState(false)

  const props = {
    ...pageProps,
    showSearchCard,
    setShowSearchCard
  }

  const not1Col = useMediaQuery({ minWidth: 800 })

  return (
    <UserContext.Provider value={userData}>
      <StreamContext.Provider value={{ streamClient }}>
        <Head />
        <div className="selection:bg-brand-teal/80 selection:text-teal-900 ">
          {!userData.user && (
            <div className="w-full h-20 p-4 text-sm text-center text-white align-middle bg-gradient-to-r to-brand-light from-teal-400 font-work-sans leading-6 sm:leading-0 sm:text-lg">
              👋 socii is currently in private pre-alpha mode.
              <div className="-mt-1">You will need an invite!</div>
            </div>
          )}
          {not1Col && <Navigation {...props} />}
          {isBrowser && <SearchCard {...props} />}
          <Component {...pageProps} className={`bg-gray-50 ${props.className}`} />
          {!not1Col && <Footer {...props} />}
        </div>
        <Toaster {...toastProps} />
      </StreamContext.Provider>
    </UserContext.Provider>
  )
}
