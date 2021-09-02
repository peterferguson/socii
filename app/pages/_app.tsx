import Head from "@components/Head"
import { AuthProvider } from "@contexts/AuthProvider"
import { onMessage } from "@firebase/messaging"
import { toastProps } from "@lib/constants"
import { messaging as messagingPromise } from "@lib/firebase/client/messaging"
import "@styles/Chat.css"
import "@styles/globals.css"
import { isBrowser } from "@utils/isBrowser"
import { serviceWorkerInitialisation } from "@utils/serviceWorkerInitialisation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import "react-file-utils/dist/index.css"
import toast from "react-hot-toast"
import { useMediaQuery } from "react-responsive"
import { innerVh } from "inner-vh"
import { deviceType } from "detect-it"
import raiseNotOptimisedForLandscapeToast from "@components/raiseNotOptimisedForLandscapeToast"

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: true,
})

const Footer = dynamic(() => import("@components/Footer"))
const MainLayout = dynamic(() => import("@components/MainLayout"))

// - Uncomment to console log web vitals
// export function reportWebVitals(metric) {
//   console.log(metric)
// }

export default function MyApp({ Component, pageProps }) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const theme = "light" // TODO: Set up localStorage cache of this and allow for change in settings
  const [screenAspectRatio, setScreenAspectRatio] = useState(
    isBrowser ? window.innerHeight / window.innerWidth : 1
  )

  useEffect(() => serviceWorkerInitialisation(), [])

  // - adjust viewport units for mobiles with notches & mobile browsers
  useEffect(() => {
    if (isBrowser) {
      innerVh({
        customPropertyName: "inner-vh",
        // Update --inner-vh on desktop alike always.
        ignoreCollapsibleUi: deviceType === "touchOnly",
        // Seems to be 114px on iOS safari.
        maximumCollapsibleUiHeight: 120,
      })
    }
  }, [])

  const updateAspectRatio = () =>
    setScreenAspectRatio(window.innerHeight / window.innerWidth)

  // - listen for orientation changes & warn mobile users about landscape orientation
  useEffect(() => {
    if (isBrowser) {
      // * Attach event on window which will track window size changes
      // * and store the aspect ratio in state
      window.addEventListener("resize", updateAspectRatio)
      raiseNotOptimisedForLandscapeToast()
      // * remove event listener on unmount
      return () => window.removeEventListener("resize", updateAspectRatio)
    }
  }, [screenAspectRatio])

  // - receive push notifications
  useEffect(() => {
    let unsub
    if (isBrowser) {
      messagingPromise.then((messaging) => {
        if (messaging) {
          unsub = onMessage(messaging, (payload) => {
            console.log(payload)

            const {
              notification: { title, body },
            } = payload

            toast(`${title}, ${body}`)
          })
        }
      })
    }
    return () => unsub?.()
  }, [])

  const router = useRouter()
  const isChatRoute = router.asPath?.includes("/chat")
  const nonStandardLayoutRoutes = ["/", "/enter", "/404", "/500"]
  const notMainLayout = nonStandardLayoutRoutes.includes(router.asPath)
  const props = { ...pageProps, theme }

  return (
    <AuthProvider>
      <main
        className={`min-h-screen no-scrollbar relative overflow-x-hidden 
          overflow-y-scroll bg-gray-100 dark:bg-gray-800 
          ${notMainLayout && "h-screen max-h-screen"}
          selection:bg-brand-lightTeal/80 selection:text-teal-900`}
      >
        <Head />
        <>
          {/* TODO: Remove this notion when moved to monorepo */}
          {notMainLayout ? (
            <Component {...props} />
          ) : (
            <MainLayout {...props}>
              {isBrowser && <Component {...props} />}
              {is1Col && !isChatRoute && <Footer {...props} />}
            </MainLayout>
          )}
        </>
        <Toaster {...toastProps} />
      </main>
    </AuthProvider>
  )
}
