import { Transition } from "@headlessui/react"
import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { usePrevious } from "@hooks/usePrevious"
import { tw } from "@utils/tw"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { IoIosPeople, IoIosStats } from "react-icons/io"
import { IoAnalyticsSharp } from "react-icons/io5"
import { useWindowScroll, useWindowSize } from "react-use"

const screens = [
  {
    title: "Search for Stocks",
    info: "Search for thousands of stocks",
    Icon: IoAnalyticsSharp,
    Image: () => (
      <Image
        src={"/images/GOOG-iphone-screenshot.png"}
        alt="socii-GOOG-stock-screenshot"
        layout="fill"
        priority={true}
      />
    ),
  },
  {
    title: "Share with Groups",
    info: "Share stock information with your group, direct in your chat",
    Icon: IoIosPeople,
    Image: () => (
      <Image
        src={"/images/chat-screenshot.png"}
        alt="socii-chat-screenshot"
        layout="fill"
        priority={true}
      />
    ),
  },
  {
    title: "Check Other Groups",
    info: "Compare against other groups and win prizes",
    Icon: IoIosStats,
    Image: () => (
      <Image
        src={"/images/leaderboard-screenshot.png"}
        alt="socii-leaderboard-screenshot"
        layout="fill"
        priority={true}
      />
    ),
  },
]

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
  const { height } = useWindowSize()
  const { y } = useWindowScroll()

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

  useEffect(() => {
    y > height && setSelectedScreenIndex(Math.floor((y - height / 2) / height))
  }, [height, y])

  const handleClick = (index: number) => () => {
    window.scroll(0, height + index * height)
    setSelectedScreenIndex(index)
  }

  return (
    <div className="relative h-[300vh]">
      <section
        className={tw(
          "h-full max-h-full p-4",
          y > height && y < 3 * height ? "fixed" : "absolute",
          y < 3 * height ? "inset-0" : `bottom-0 top-[200vh] inset-x-0`
        )}
      >
        <div className="relative flex p-4 max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
          <div className="w-full px-8 mx-auto sm:mx-0" ref={cardsRef}>
            <Transition
              show={cardsVisible || animated}
              className="flex flex-col items-center justify-between w-full"
              enter="transition transform delay-500 duration-700 ease-in"
              enterFrom="opacity-0 translate-y-24"
              enterTo="translate-y-0"
              afterEnter={() => setAnimated(true)}
            >
              <div className="flex flex-col items-center sm:flex-row sm:w-full">
                <Screens
                  selectedScreenIndex={selectedScreenIndex}
                  changeDirection={changeDirection}
                />
                <div className="flex flex-row pb-3 mt-12 sm:ml-24 sm:items-center sm:flex-col">
                  {screens.map((item, i) => (
                    <>
                      {i !== 0 && (
                        <div
                          key={`line-${i - 1}`}
                          className={`z-0 w-20 sm:w-0 h-0 sm:h-16 mt-6 sm:mt-0 border ${
                            selectedScreenIndex > i - 1
                              ? "border-brand/80"
                              : "border-brand/40"
                          }`}
                        />
                      )}
                      <button key={i} onClick={handleClick(i)}>
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
                                  selectedScreenIndex == i ? "text-white" : "text-brand"
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
                {/* 💩 solution to having the first text appear before transition */}
                {selectedScreenIndex === 0 && changeDirection === undefined && (
                  <div className="w-full mx-0 text-center sm:mx-8 sm:w-1/2 sm:text-left font-primary">
                    <p className="pb-3 text-lg sm:text-5xl whitespace-nowrap">
                      {screens[0].title}
                    </p>
                    <p className="text-base font-thin sm:pl-2 sm:text-lg sm:whitespace-nowrap">
                      {screens[0].info}
                    </p>
                  </div>
                )}
                {[0, 1, 2].map((i) => (
                  <Transition
                    key={`transition-image-${i}`}
                    className="flex flex-col items-center justify-center w-full sm:items-start"
                    show={selectedScreenIndex === i && changeDirection !== undefined}
                    appear={true}
                    enter="transition ease-out duration-500 transform"
                    enterFrom={
                      changeDirection === "right"
                        ? "translate-x-24 opacity-0"
                        : "-translate-x-24 opacity-0"
                    }
                    enterTo="translate-x-0 opacity-100"
                    leave="transition ease-out duration-500 transform"
                    leaveFrom="translate-x-0 opacity-100"
                    leaveTo={
                      changeDirection === "right"
                        ? "-translate-x-24 opacity-0"
                        : "translate-x-24 opacity-0"
                    }
                  >
                    {i === selectedScreenIndex && (
                      <div className="w-full mx-0 text-center sm:mx-8 sm:w-1/2 sm:text-left font-primary">
                        <p className="pb-3 text-lg sm:text-5xl whitespace-nowrap">
                          {screens[i].title}
                        </p>
                        <p className="text-base font-thin sm:pl-2 sm:text-lg sm:whitespace-nowrap">
                          {screens[i].info}
                        </p>
                      </div>
                    )}
                  </Transition>
                ))}
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </div>
  )
}

const IphoneMock = ({ children }) => (
  <div className="relative mx-auto overflow-hidden border-black shadow-xl h-[490px] w-[245px] md:h-[712px] md:w-[350px] rounded-[2.5rem] border-[10px]">
    <div className="absolute inset-x-0 top-0 z-50">
      <div className="z-20 h-4 mx-auto bg-black w-28 md:w-40 md:h-6 rounded-b-3xl" />
    </div>
    {children}
  </div>
)

const Screens = ({ selectedScreenIndex, changeDirection }) => {
  return (
    <div
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
            priority={true}
          />
        )}
        {[0, 1, 2].map((i) => (
          <Transition
            key={`transition-image-${i}`}
            className="absolute inset-0 z-10 flex w-full h-full"
            show={selectedScreenIndex === i && changeDirection !== undefined}
            unmount={false}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={
              changeDirection === "right" ? "translate-x-full" : "-translate-x-full"
            }
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo={
              changeDirection === "right" ? "-translate-x-full" : "translate-x-full"
            }
          >
            {i === 0 && (
              <Image
                src={"/images/GOOG-iphone-screenshot.png"}
                alt="socii-GOOG-stock-screenshot"
                layout="fill"
                priority={true}
              />
            )}
            {i === 1 && (
              <Image
                src={"/images/chat-screenshot.png"}
                alt="socii-chat-screenshot"
                layout="fill"
                priority={true}
              />
            )}
            {i === 2 && (
              <Image
                src={"/images/leaderboard-screenshot.png"}
                alt="socii-leaderboard-screenshot"
                layout="fill"
                priority={true}
              />
            )}
          </Transition>
        ))}
      </IphoneMock>
    </div>
  )
}

export default ScreenDemo
