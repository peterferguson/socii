import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { tw } from "@utils/tw"
import React, { useEffect, useRef, useState } from "react"
import { Transition } from "@headlessui/react"
import { useMediaQuery } from "react-responsive"
import Image from "next/image"
import { IoAnalyticsSharp } from "react-icons/io5"
import { IoIosPeople, IoIosStats } from "react-icons/io"
import LineTo from "react-lineto"

// TODO ALIGN INFO UNDER BUTTONS!! (line 97)
// TODO put line behind image (line 95)
const ScreenDemo = () => {

  const [animated, setAnimated] = React.useState(false)
  const cardsRef = useRef(null)
  const cardsEntry = useIntersectionObserver(cardsRef, {})
  const cardsVisible = !!cardsEntry?.isIntersecting

  const is1Col = useMediaQuery({ minWidth: 640 })

  const [selectedTab, setSelectedTab] = useState("Stocks")
  const [selectedTabInfo, setSelectedTabInfo] = useState(null)
  const screenInfo = [
    {
      Tab: "Stocks",
      Title: "Search for Stocks",
      Info: "Search thousands of stocks for price history, charts, or even current news regarding the company",
      Icon: IoAnalyticsSharp,
      Image: "/images/stocks_iphone.png"
    },
    {
      Tab: "Groups",
      Title: "Share with Groups",
      Info: "Share the information you find with your group, direct in your chat",
      Icon: IoIosPeople,
      Image: "/images/chat_iphone.png"
    },
    {
      Tab: "Leaderboards",
      Title: "Check Other Groups",
      Info: "Compare yourself against other groups, and win prizes in competitions",
      Icon: IoIosStats,
      Image:  "/images/leaderboard_iphone.png"
    },
  ]
  useEffect(()=>{
    const displayInfo = (selected) => {
      let {Title, Info, Image} = screenInfo.find(t => t.Tab == selected) 
      return {Title, Info, Image}
    }
    if(selectedTab) setSelectedTabInfo(displayInfo(selectedTab))
  }, [selectedTab])

  return (
  
    <div className="relative h-full">
      <section className="relative h-full max-h-full p-4">
        <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-tr via-white from-white to-palette-lightest" />
          <div className="relative flex p-4 max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
            <div className="w-full ">
              <div
                className="w-full max-w-sm px-8 mx-auto lg:w-1/2 sm:max-w-xl"
                ref={cardsRef}
              >
                <Transition 
                    show={cardsVisible || animated}
                    enter="transition transform delay-500 duration-700 ease-in"
                    enterFrom="opacity-0 translate-y-24"
                    enterTo="translate-y-0"
                    afterEnter={() => setAnimated(true)}
                >    
                  <div className="flex flex-col items-center">
                    <div ref ={cardsRef} >
                      <Image className="z-1 A" src={selectedTabInfo?.Image ? selectedTabInfo?.Image: "/icons/stocks_iphone.png" } alt="image" height="500" width="250" />
                    </div>
                    <div className="flex flex-row pb-3">
                      {screenInfo.map((item, i )=>(
                        <button 
                          key={i}
                          onClick={()=>setSelectedTab(item.Tab)}
                          
                        >
                          <div className="p-2">
                            <div className={selectedTab==item.Tab? "ring-2 gradient-flow opacity-50 ring-purple-500 p-2 rounded-full B" : "ring-2 ring-brand p-2 rounded-full"}>
                              <div className="flex items-center justify-center flex-shrink sm:h-10 sm:w-10">
                                <item.Icon 
                                className={tw("w-10 h-10 m-1",
                                selectedTab==item.Tab ? "text-white":"text-brand")} aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}    
                      <LineTo from="B" to="A" fromAnchor="top center"  borderWidth={2} borderColor="purple" className="z-0 p-2 opacity-50"/>      
                    </div>
                    <div className="flex flex-col items-center ">
                      <div className="pb-3 text-lg font-semibold">
                        {selectedTabInfo?.Title}
                      </div>
                      <div className="text-base sm:text-m">
                        {selectedTabInfo?.Info}
                      </div>
                    </div>
                  </div>
                </Transition>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ScreenDemo
