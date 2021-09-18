import Head from "@components/Head"
import { MainLayoutDynamic } from "@components/MainLayout"
import { AuthProvider } from "@contexts/AuthProvider"
import useInnerViewport from "@hooks/useInnerViewport"
import useOrientationWarning from "@hooks/useOrientationWarning"
import useReceivePushNotifications from "@hooks/useReceivePushNotifications"
import { toastProps } from "@lib/constants"
import "@styles/Chat.css"
import "@styles/globals.css"
import { serviceWorkerInitialisation } from "@utils/serviceWorkerInitialisation"
import { tw } from "@utils/tw"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import "react-file-utils/dist/index.css"
import "../scripts/wdyr"

const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: true,
})

// - Uncomment to console log web vitals
// export function reportWebVitals(metric) {
//   console.log(metric)
// }

export default function MyApp({ Component, pageProps }) {
  useEffect(() => serviceWorkerInitialisation(), [])

  useOrientationWarning()
  useReceivePushNotifications()
  useInnerViewport()

  // const [theme, ,] = useDarkMode()
  const theme = "light"

  const router = useRouter()
  const nonStandardLayoutRoutes = ["/", "/enter", "/404", "/500"]
  const notMainLayout = nonStandardLayoutRoutes.includes(router.asPath)
  const props = { ...pageProps, theme }

  return (
    <div
      className={tw(
        "no-scrollbar relative",
        "overflow-hidden bg-gray-50 dark:bg-gray-800",
        "selection:bg-brand-lightTeal/80 selection:text-teal-900",
        !notMainLayout && "max-h-screen max-w-screen h-screen w-screen"
      )}
    >
      <Head />
      <AuthProvider>
        {/* TODO: Remove this notion when moved to monorepo */}
        {notMainLayout ? (
          <Component {...props} />
        ) : (
          <MainLayoutDynamic>
            <Component {...props} />
          </MainLayoutDynamic>
        )}
      </AuthProvider>
      <Toaster {...toastProps} />
    </div>
  )
}
