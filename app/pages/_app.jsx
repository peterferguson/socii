import Head from "@components/Head"
import { AuthProvider } from "@contexts/AuthProvider"
import { StreamProvider } from "@contexts/StreamProvider"
import { useStream } from "@hooks/useStream"
import { toastProps } from "@lib/constants"
import "@styles/Chat.css"
import "@styles/globals.css"
import { isBrowser } from "@utils/isBrowser"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import "react-file-utils/dist/index.css"
import { useMediaQuery } from "react-responsive"

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: true,
})

const Chat = dynamic(() => import("stream-chat-react").then((mod) => mod.Chat), {
  ssr: false,
})

const Footer = dynamic(() => import("@components/Footer"))
const MainLayout = dynamic(() => import("@components/MainLayout"))
const Navigation = dynamic(() => import("@components/Navigation"))

// - Uncomment to console log web vitals
// export function reportWebVitals(metric) {
//   console.log(metric)
// }

export default function MyApp({ Component, pageProps }) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const [showActiveChannel, setShowActiveChannel] = useState(false)

  // const scrollRef = useRef(null)
  // const { up, down } = useScrollDirection(scrollRef)
  // console.log("scroll: ", up)
  // console.log("scroll: ", down)

  // TODO: Scroll ref is not working! So cannot animate the nav Footer on scroll down

  const theme = "light" // TODO: Set up localStorage cache of this and allow for change in settings

  const props = {
    ...pageProps,
    showActiveChannel,
    setShowActiveChannel,
    theme,
  }

  const router = useRouter()

  useEffect(
    () => showActiveChannel && setShowActiveChannel(!showActiveChannel),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  )

  const nonStandardLayoutRoutes = ["/", "/enter", "/404", "/500"]

  const notMainLayout = nonStandardLayoutRoutes.includes(router.asPath)

  return (
    <AuthProvider>
      <StreamProvider>
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
              <ComponentContainer {...props}>
                {isBrowser && <Component {...props} />}
                {is1Col && <Footer {...props} />}
              </ComponentContainer>
            )}
          </>
          <Toaster {...toastProps} />
        </main>
      </StreamProvider>
    </AuthProvider>
  )
}

const ComponentContainer = (props) => {
  const { client } = useStream()
  return (
    <Chat client={client} theme={`messaging ${props.theme}`}>
      <MainLayout {...props} />
    </Chat>
  )
}
