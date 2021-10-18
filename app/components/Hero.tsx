import Navigation from "@components/Navigation"
import WaitlistInvite from "@components/WaitlistInvite"
import { Transition } from "@headlessui/react"
import { useDisableScroll } from "@hooks/useDisableScroll"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useTimeoutFn } from "react-use"

const showPromtion = () =>
  toast.custom(
    (t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"}
       max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex flex-col h-16 p-4 text-tiny 
      text-white bg-brand-cyan-green font-secondary leading-6 sm:leading-0 sm:text-base
      items-center justify-center text-center align-middle
      `}
      >
        👋 We are currently in private alpha mode.
        <p className="items-center -mt-2 sm:-mt-1">
          You will need to join the waitlist!
        </p>
      </div>
    ),
    { duration: 7500, position: "bottom-center" }
  )
export const Hero = ({ invited, setInvited }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [showBlackOverlay, setShowBlackOverlay] = useState(true)
  const [, , hideBlackOverlay] = useTimeoutFn(() => setShowBlackOverlay(false), 1000)
  const [, , unhideOptions] = useTimeoutFn(() => setShowOptions(true), 1500)

  useDisableScroll(!showOptions)

  return (
    <div className="relative h-screen">
      <Navigation showOptions={showOptions} />
      <Transition.Root show={showBlackOverlay}>
        <div className="flex items-center justify-center">
          <Transition.Child
            leave="transition ease-out delay-500 duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-y-0 z-30 w-screen h-full bg-black"
          />
        </div>
      </Transition.Root>
      <div className="h-screen grid grid-cols-3 bg-gradient-to-tl via-white to-white from-palette-lightest">
        <div className="flex flex-col justify-center mx-auto col-span-2">
          <div className="z-40 pt-4 pl-6 text-5xl text-white sm:pl-12 sm:text-7xl font-primary mix-blend-difference">
            <Transition
              show={true}
              appear={true}
              as="h1"
              enter="transition transform delay-300 duration-700 ease-in"
              enterFrom="skew-y-8 translate-y-24 opacity-0"
              enterTo="translate-y-0 opacity-100"
              afterEnter={() => {
                hideBlackOverlay()
                unhideOptions()
              }}
            >
              Invest with Friends.
            </Transition>
          </div>
          {/* <Circles className="absolute inset-0 z-50" /> */}
          <div className="relative pt-2 pl-8 text-xs text-black sm:pl-16 sm:text-lg md:text-xl font-secondary">
            Buy stocks & crypto directly from your group chat.
            <div className="absolute left-0 p-8 pt-12 w-96 sm:w-4/5 -bottom-28 umami--click--landing-page-hero-waitlist-input">
              <WaitlistInvite invited={invited} setInvited={setInvited} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
