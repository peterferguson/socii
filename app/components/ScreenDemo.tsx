import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { tw } from "@utils/tw"
import React, { useEffect, useRef, useState } from "react"
import { Transition } from "@headlessui/react"
import { useMediaQuery } from "react-responsive"
import Image from "next/image"
import { IoAnalyticsSharp } from "react-icons/io5"
import { IoIosPeople, IoIosStats } from "react-icons/io"
import { useWindowSize } from "@hooks"
// import LineTo from "react-lineto"

// TODO ALIGN INFO UNDER BUTTONS!! (line 97)
// TODO put line behind image (line 95)
const ScreenDemo = () => {
  const [animated, setAnimated] = React.useState(false)
  const cardsRef = useRef(null)
  const cardsEntry = useIntersectionObserver(cardsRef, {})
  const cardsVisible = !!cardsEntry?.isIntersecting

  const screens = [
    {
      title: "Search for Stocks",
      info: "Search thousands of stocks for price history, charts, or even current news regarding the company",
      Icon: IoAnalyticsSharp,
      Image: () => (
        <Image
          className="absolute inset-0 z-10 w-full h-full"
          src={"/images/GOOG-iphone-screenshot.png"}
          alt="socii-GOOG-stock-screenshot"
          layout="fill"
        />
      ),
    },
    {
      title: "Share with Groups",
      info: "Share the information you find with your group, direct in your chat",
      Icon: IoIosPeople,
      Image: () => (
        <Image
          className="absolute inset-0 z-10 w-full h-full"
          src={"/images/chat-screenshot.png"}
          alt="socii-chat-screenshot"
          layout="fill"
        />
      ),
    },
    {
      title: "Check Other Groups",
      info: "Compare yourself against other groups, and win prizes in competitions",
      Icon: IoIosStats,
      Image: () => (
        <Image
          className="absolute inset-0 z-10 w-full h-full"
          src={"/images/leaderboard-screenshot.png"}
          alt="socii-leaderboard-screenshot"
          layout="fill"
        />
      ),
    },
  ]

  const [selectedTab, setSelectedTab] = useState(0)

  const IphoneImage = screens[selectedTab].Image

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
                  <div
                    ref={cardsRef}
                    style={{
                      position: "relative",
                      borderRadius: "2.5rem",
                      boxShadow: "0px 0px 60px #fff",
                    }}
                  >
                    <IphoneMock>
                      <IphoneImage />
                    </IphoneMock>
                  </div>
                  <div className="flex flex-row pb-3 mt-12">
                    {screens.map((item, i) => (
                      <>
                        {i !== 0 && (
                          <div
                            key={`line-${i - 1}`}
                            className={`z-0 w-20 sm:w-32 h-0 mt-6 border ${
                              selectedTab > i - 1
                                ? "border-brand/80"
                                : "border-brand/40"
                            }`}
                          />
                        )}
                        <button key={i} onClick={() => setSelectedTab(i)}>
                          <div className="flex items-center justify-center">
                            <div
                              className={tw(
                                "ring-2 z-10 rounded-full p-2 space-x-6",
                                selectedTab == i
                                  ? "gradient-flow opacity-50 ring-purple-500"
                                  : "ring-brand"
                              )}
                            >
                              <div className="flex items-center justify-center sm:h-10 sm:w-10">
                                <item.Icon
                                  className={tw(
                                    "w-6 h-6 m-1",
                                    selectedTab == i ? "text-white" : "text-brand"
                                  )}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                        </button>
                      </>
                    ))}
                  </div>
                  <Transition
                    className="flex flex-col items-center text-center font-primary "
                    enter="transition duration-75 ease-in"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                  >
                    <div className="pb-3 text-lg">{screens[selectedTab].title}</div>
                    <div className="text-base font-thin sm:text-sm">
                      {screens[selectedTab].info}
                    </div>
                  </Transition>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const IphoneMock = ({ children }) => (
  <div className="relative mx-auto overflow-hidden border-white shadow-xl h-[712px] w-[350px] rounded-[2.5rem] border-[14px]">
    <div className="absolute inset-x-0 top-0 z-50">
      <div className="z-20 w-40 h-6 mx-auto bg-white rounded-b-3xl" />
    </div>
    {children}
  </div>
)

export default ScreenDemo
