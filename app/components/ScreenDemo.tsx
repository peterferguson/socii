import { Transition } from "@headlessui/react"
import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { usePrevious } from "@hooks/usePrevious"
import { tw } from "@utils/tw"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { IoIosPeople, IoIosStats } from "react-icons/io"
import { IoAnalyticsSharp } from "react-icons/io5"

// TODO ALIGN INFO UNDER BUTTONS!! (line 97)
// TODO put line behind image (line 95)
const ScreenDemo = () => {
  const [animated, setAnimated] = React.useState(false)
  const cardsRef = useRef(null)
  const cardsEntry = useIntersectionObserver(cardsRef, {})
  const cardsVisible = !!cardsEntry?.isIntersecting

  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0)
  const previousScreenIndex = usePrevious(selectedScreenIndex)
  const [changeDirection, setChangeDirection] = useState<"right" | "left" | undefined>(
    undefined
  )

  useEffect(() => {
    setChangeDirection(
      previousScreenIndex !== undefined
        ? // @ts-ignore
          selectedScreenIndex > previousScreenIndex
          ? "right"
          : "left"
        : undefined
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScreenIndex])

  // - Define this here to ensure images are loaded before animation
  const screens = [
    {
      title: "Search for Stocks",
      info: "Search thousands of stocks for price history, charts, or even current news regarding the company",
      Icon: IoAnalyticsSharp,
      Image: () => (
        <Image
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
          src={"/images/leaderboard-screenshot.png"}
          alt="socii-leaderboard-screenshot"
          layout="fill"
        />
      ),
    },
  ]

  const IphoneImage = screens[selectedScreenIndex].Image

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
                    className="bg-gray-50"
                    style={{
                      position: "relative",
                      borderRadius: "2.5rem",
                      boxShadow: "0px 0px 60px #fff",
                    }}
                  >
                    <IphoneMock>
                      {/* 💩 solution to having the first image appear before transition */}
                      {selectedScreenIndex === 0 && changeDirection === undefined && (
                        <Image
                          src={"/images/GOOG-iphone-screenshot.png"}
                          alt="socii-GOOG-stock-screenshot"
                          layout="fill"
                        />
                      )}
                      {[0, 1, 2].map((i) => (
                        <Transition
                          key={`transition-image-${i}`}
                          className="absolute inset-0 z-10 flex w-full h-full"
                          show={
                            selectedScreenIndex === i && changeDirection !== undefined
                          }
                          unmount={false}
                          enter="transition ease-in-out duration-300 transform"
                          enterFrom={
                            changeDirection === "right"
                              ? "translate-x-full"
                              : "-translate-x-full"
                          }
                          enterTo="translate-x-0"
                          leave="transition ease-in-out duration-300 transform"
                          leaveFrom="translate-x-0"
                          leaveTo={
                            changeDirection === "right"
                              ? "-translate-x-full"
                              : "translate-x-full"
                          }
                        >
                          <IphoneImage />
                        </Transition>
                      ))}
                    </IphoneMock>
                  </div>
                  <div className="flex flex-row pb-3 mt-12">
                    {screens.map((item, i) => (
                      <>
                        {i !== 0 && (
                          <div
                            key={`line-${i - 1}`}
                            className={`z-0 w-20 sm:w-32 h-0 mt-6 border ${
                              selectedScreenIndex > i - 1
                                ? "border-brand/80"
                                : "border-brand/40"
                            }`}
                          />
                        )}
                        <button key={i} onClick={() => setSelectedScreenIndex(i)}>
                          <div className="flex items-center justify-center">
                            <div
                              className={tw(
                                "ring-2 z-10 rounded-full p-2 space-x-6",
                                selectedScreenIndex == i
                                  ? "gradient-flow opacity-50 ring-purple-500"
                                  : "ring-brand"
                              )}
                            >
                              <div className="flex items-center justify-center sm:h-10 sm:w-10">
                                <item.Icon
                                  className={tw(
                                    "w-6 h-6 m-1",
                                    selectedScreenIndex == i
                                      ? "text-white"
                                      : "text-brand"
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
                    <div className="pb-3 text-lg">
                      {screens[selectedScreenIndex].title}
                    </div>
                    <div className="text-base font-thin sm:text-sm">
                      {screens[selectedScreenIndex].info}
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
  <div className="relative mx-auto overflow-hidden border-white shadow-xl h-[500px] w-[250px] md:h-[712px] md:w-[350px] rounded-[2.5rem] border-[14px]">
    <div className="absolute inset-x-0 top-0 z-50">
      <div className="z-20 h-4 mx-auto bg-white w-28 md:w-40 md:h-6 rounded-b-3xl" />
    </div>
    {children}
  </div>
)

export default ScreenDemo
