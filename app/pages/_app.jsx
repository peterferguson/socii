import 'stream-chat-react/dist/css/index.css'
import '@styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Head from '@components/Head'
import Navigation from '@components/Navigation'
import SearchCard from '@components/SearchCard'
import { UserContext } from '@lib/context'
import { useUserData } from '@lib/hooks'
import { isBrowser } from '@utils/helper'

import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { toastProps } from '@lib/constants'

export default function MyApp({ Component, pageProps }) {
  const userData = useUserData()
  const [showSearchCard, setShowSearchCard] = useState(false)

  const props = {
    ...pageProps,
    showSearchCard,
    setShowSearchCard,
  }

  return (
    <UserContext.Provider value={userData}>
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
    </UserContext.Provider>
  )
}
