import Head from "@components/Head"
import { AuthProvider } from "@contexts/AuthProvider"
import { useDarkMode } from "@hooks/useDarkMode"
import useInnerViewport from "@hooks/useInnerViewport"
import useOrientationWarning from "@hooks/useOrientationWarning"
import useReceivePushNotifications from "@hooks/useReceivePushNotifications"
import { toastProps } from "@lib/constants"
import "@styles/Chat.css"
import "@styles/globals.css"
import { isBrowser } from "@utils/isBrowser"
import { serviceWorkerInitialisation } from "@utils/serviceWorkerInitialisation"

import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import "react-file-utils/dist/index.css"
import { useMediaQuery } from "react-responsive"
import "../scripts/wdyr"

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

  useEffect(() => serviceWorkerInitialisation(), [])

  useOrientationWarning()
  useReceivePushNotifications()
  useInnerViewport()

  const [theme, , componentMounted] = useDarkMode()

  if (componentMounted) {
    theme !== "light"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark")
  }

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
