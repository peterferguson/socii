import Navigation from "@components/Navigation"
import WaitlistInvite from "@components/WaitlistInvite"
import { Transition } from "@headlessui/react"
import { useAuth } from "@hooks/useAuth"
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
  const { user } = useAuth()
  const [showOptions, setShowOptions] = useState(false)
  const [showBlackOverlay, setShowBlackOverlay] = useState(true)
  const [, , hideBlackOverlay] = useTimeoutFn(() => setShowBlackOverlay(false), 1500)
  const [, , unhideOptions] = useTimeoutFn(() => setShowOptions(true), 3000)

  return (
    <div className="relative h-screen">
      <Navigation showOptions={showOptions} />
      <Transition.Root show={showBlackOverlay}>
        <div className="flex items-center justify-center">
          <Transition.Child
            leave="transition transform ease-out delay-700 duration-1000"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            className="absolute inset-y-0 z-30 w-screen bg-black h-[51%]"
          />
          <Transition.Child
            leave="transition transform ease-out delay-700 duration-1000"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            // beforeLeave={() => setBlackText(true)}
            afterLeave={() => !user && showPromtion()}
            className="absolute z-50 w-screen bg-black inset-y-1/2 h-1/2"
          />
        </div>
      </Transition.Root>
      <div className="h-screen grid grid-cols-2 bg-gradient-to-tl via-white to-white from-brand-shade-blue">
      {/* <div className="h-screen bg-white grid grid-cols-2"> */}
        <div className="flex flex-col justify-center mx-auto">
          <div className="z-40 px-4 pt-4 text-6xl text-white thin:text-7xl sm:text-8xl font-primary mix-blend-difference">
            <Transition
              show={true}
              appear={true}
              as="h1"
              enter="transition transform delay-300 duration-1000 ease-in"
              enterFrom="skew-y-8 translate-y-24 opacity-0"
              enterTo="translate-y-0 opacity-100"
              afterEnter={() => {
                hideBlackOverlay()
                unhideOptions()
              }}
            >
              Invest Together.
            </Transition>
          </div>
          <div className="pt-8 pl-4 text-lg text-black sm:text-xl font-secondary">
            Follow, chat, and invest with friends.
          </div>
          <div className="p-8">
            <WaitlistInvite invited={invited} setInvited={setInvited} />
          </div>
        </div>
      </div>
    </div>
  )
}
