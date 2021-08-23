import Head from "@components/Head"
import { AuthProvider } from "@contexts/AuthProvider"
import { toastProps } from "@lib/constants"
import { getFCMToken, onMessageListener } from "@lib/firebase/client/messaging"
import "@styles/Chat.css"
import "@styles/globals.css"
import { isBrowser } from "@utils/isBrowser"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import "react-file-utils/dist/index.css"
import { useMediaQuery } from "react-responsive"
import { messaging } from "@lib/firebase/client/messaging"
import { onMessage } from "@firebase/messaging"
import toast from "react-hot-toast"

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

  console.log(messaging)

  useEffect(() => {
    isBrowser &&
      getFCMToken()
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            console.log(currentToken)
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            )
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err)
          // ...
        })
  }, [])

  useEffect(() => {
    if (isBrowser && "serviceWorker" in navigator && window.workbox !== undefined) {
      const wb = window?.workbox
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb?.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb?.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      wb?.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = (event) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (
          confirm("A newer version of this web app is available, reload to update?")
        ) {
          wb?.addEventListener("controlling", (event) => {
            window.location.reload()
          })

          // Send a message to the waiting service worker, instructing it to activate.
          wb?.messageSkipWaiting()
        } else {
          console.log(
            "User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time."
          )
        }
      }

      wb?.addEventListener("waiting", promptNewVersionAvailable)
      // never forget to call register as auto register is turned off in next.config.js
      wb.register()
    }
  }, [])

  useEffect(() => {
    let unsub
    if (isBrowser) {
      unsub = onMessage(messaging, (payload) => {
        console.log(payload)

        const {
          data: { notification },
        } = payload

        const { title, body } =
          typeof notification === "string"
            ? JSON.parse(notification.replace(/\\/g, ""))
            : notification

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
