import { FooterDynamic } from "@components/Footer"
import NavHeader from "@components/NavHeader"
import { StreamProvider } from "@contexts/streamContext"
import { useStreamClient } from "@hooks"
import { tw } from "@utils/tw"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
import { useMediaQuery } from "react-responsive"

const Chat = dynamic(() => import("stream-chat-react").then((mod) => mod.Chat), {
  ssr: false,
}) as any

const Sidebar = dynamic(() => import("@components/Sidebar"))

const MainLayout = ({ children }) => {
  const is1Col = !useMediaQuery({ minWidth: 640 })

  const router = useRouter()
  const isChatRoute = router.asPath?.includes("/chat")
  const isMobileChat = isChatRoute && is1Col
  const theme = "light"

  const { client } = useStreamClient()

  // TODO: Add default component sizes
  // 1, 2, 3, 4 column components
  // - Something like a <FourColumnComponent>{props.children}</FourColumnComponent>

  return (
    <div className={tw("w-full h-full", !isMobileChat && "grid grid-cols-8")}>
      {!isMobileChat && <NavHeader />}
      <div className="col-span-1">{!is1Col && <Sidebar />}</div>
      <StreamProvider>
        {client && (
          <Chat
            client={client}
            theme={`messaging ${theme}`}
            customStyles={{
              "--primary-color": "#3fbaeb",
              "--grey-gainsboro": "#F9FAFB",
              "--main-font": "Poppins, sans-serif",
              "--second-font": "Open Sans, sans-serif",
              "--xs-font": "0.625rem", // - tiny
              "--sm-font": "0.75rem", // - xs
              "--md-font": "0.875rem", // - sm
              "--lg-font": "1rem", // - base
              "--xl-font": "1.125rem", // - lg
              "--xxl-font": "1.25rem", // - xl
              "--xxxl-font": "1.5rem", // - 2xl
            }}
          >
            <main
              className={tw(
                !isMobileChat &&
                  "px-0 sm:px-4  py-2 sm:py-4 col-span-8 sm:col-span-7 overflow-x-hidden mt-14 sm:mt-20 standalone:pb-safe-bottom standalone:pt-safe-top overflow-y-scroll"
              )}
              style={{ paddingBottom: is1Col ? "5rem" : "1rem" }}
            >
              <div
                className={tw(
                  "flex flex-col items-center justify-center sm:flex-row",
                  !isMobileChat && "mx-4"
                )}
              >
                {children}
              </div>
            </main>
          </Chat>
        )}
      </StreamProvider>
      <FooterDynamic />
    </div>
  )
}

export default MainLayout
