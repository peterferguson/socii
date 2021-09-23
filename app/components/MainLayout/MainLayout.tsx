import { FooterDynamic } from "@components/Footer"
import NavHeader from "@components/NavHeader"
import { StreamProvider } from "@contexts/streamContext"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
import { useMediaQuery } from "react-responsive"

const Sidebar = dynamic(() => import("@components/Sidebar"))

const MainLayout = ({ children }) => {
  const is1Col = !useMediaQuery({ minWidth: 640 })

  const router = useRouter()
  const isChatRoute = router.asPath?.includes("/chat")

  // TODO: Add default component sizes
  // 1, 2, 3, 4 column components
  // - Something like a <FourColumnComponent>{props.children}</FourColumnComponent>

  return (
    <div className="w-full h-full grid grid-cols-8">
      <NavHeader />
      <div className="col-span-1">{!is1Col && <Sidebar />}</div>
      <StreamProvider>
        <main className="p-4 overflow-x-hidden overflow-y-scroll mt-14 sm:mt-20 standalone:mb-safe-bottom standalone:pb-20 standalone:pt-safe-top sm:py-2 sm:space-y-4 col-span-8 sm:col-span-7 no-scrollbar">
          <div className="flex flex-col items-center justify-center mx-4 sm:flex-row">
            {children}
          </div>
        </main>
      </StreamProvider>
      {!isChatRoute && <FooterDynamic />}
    </div>
  )
}

export default MainLayout
