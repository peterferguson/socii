import Head from "@components/Head"
import { AuthProvider } from "@contexts/AuthProvider"
import { onMessage } from "@firebase/messaging"
import { toastProps } from "@lib/constants"
import { messaging } from "@lib/firebase/client/messaging"
import "@styles/Chat.css"
import "@styles/globals.css"
import { isBrowser } from "@utils/isBrowser"
import { serviceWorkerInitialisation } from "@utils/serviceWorkerInitialisation"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import "react-file-utils/dist/index.css"
import toast from "react-hot-toast"
import { useMediaQuery } from "react-responsive"

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: true,
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
  const theme = "light" // TODO: Set up localStorage cache of this and allow for change in settings

  const props = {
    ...pageProps,
    theme,
  }

  useEffect(() => serviceWorkerInitialisation(), [])

  // - receive push notifications
  useEffect(() => {
    let unsub
    if (isBrowser) {
      unsub = onMessage(messaging, (payload) => {
        console.log(payload)

        const {
          notification: { title, body },
        } = payload

        toast(`${title}, ${body}`)
      })
    }
    return () => unsub()
  }, [])

  const router = useRouter()
  const nonStandardLayoutRoutes = ["/", "/enter", "/404", "/500"]
  const notMainLayout = nonStandardLayoutRoutes.includes(router.asPath)

  return (
    <AuthProvider>
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
            <MainLayout {...props}>
              {isBrowser && <Component {...props} />}
              {is1Col && <Footer {...props} />}
            </MainLayout>
          )}
        </>
        <Toaster {...toastProps} />
      </main>
    </AuthProvider>
  )
}
