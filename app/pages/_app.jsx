import Head from "@components/Head"
import Navigation from "@components/Navigation"
import { toastProps } from "@lib/constants"
import { StreamContext, UserContext } from "@lib/context"
import { useStream, useUserData } from "@lib/hooks"
import "@styles/globals.css"
import { isBrowser } from "@utils/helper"
import dynamic from "next/dynamic"
import React, { useState } from "react"
const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster))
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
    setShowSearchCard,
  }

  return (
    <UserContext.Provider value={userData}>
      <StreamContext.Provider value={{ streamClient }}>
        <Head />
        {!userData.user && (
          <div className="w-full h-20 p-4 text-sm text-center text-white align-middle bg-gradient-to-r to-brand-light from-teal-400 font-work-sans leading-6 sm:leading-0 sm:text-lg">
            👋 socii is currently in private pre-alpha mode.
            <div className="-mt-1">You will need an invite!</div>
          </div>
        )}
        <Navigation {...props} />
        {isBrowser && <SearchCard {...props} />}
        <Component {...pageProps} className={`bg-gray-50 ${props.className}`} />
        <Toaster {...toastProps} />
      </StreamContext.Provider>
    </UserContext.Provider>
  )
}
