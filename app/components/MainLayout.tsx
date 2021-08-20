import NavHeader from "@components/NavHeader"
import { StreamProvider } from "@contexts/streamContext"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
import { useMediaQuery } from "react-responsive"

const Sidebar = dynamic(() => import("@components/Sidebar"))

const MainLayout = ({ children }) => {
  const router = useRouter()
  const isChatRoute = router.asPath?.includes("/chat")
  const is1Col = !useMediaQuery({ minWidth: 640 })

  // TODO: Add default component sizes
  // 1, 2, 3, 4 column components
  // - Something like a <FourColumnComponent>{props.children}</FourColumnComponent>

  return (
    <div className="flex items-start">
      {!is1Col && <Sidebar />}
      <StreamProvider>
        <div className="flex flex-col items-start w-full h-screen px-1 sm:py-2 sm:space-y-4">
          {!(is1Col && isChatRoute) && <NavHeader />}
          {/* Main Components */}
          <div className="w-full h-full overflow-auto no-scrollbar">
            <div className="flex flex-col flex-wrap mx-4 sm:flex-row">{children}</div>
          </div>
        </div>
      </StreamProvider>
    </div>
  )
}

export default MainLayout
