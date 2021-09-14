import { joinWaitlist } from "@utils/joinWaitlist"
import { tw } from "@utils/tw"
import React from "react"
import toast from "react-hot-toast"
import { HiX } from "react-icons/hi"

const JoinWaitlistToast = ({ t, email }) => (
  <div
    className={tw(
      t.visible ? "animate-enter" : "animate-leave",
      "max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex h-16",
      "p-4 text-tiny bg-white dark:bg-logo-darkBg font-secondary",
      "sm:leading-0 sm:text-base items-center justify-center text-center",
      "align-middle font-primary leading-6"
    )}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-center justify-center">
        <button onClick={() => toast.dismiss(t.id)}>
          <HiX />
        </button>
        <div className="flex-1 ml-3">
          <p className="text-sm text-gray-900">Click here to join the waitlist!</p>
        </div>
      </div>
    </div>

    <button
      onClick={() => {
        joinWaitlist(email)
        toast.dismiss(t.id)
        toast.success("Awesome! Keep an eye on your email for updates!", {
          icon: "👀",
          duration: 5000,
        })
      }}
      className="justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
    >
      JOIN ✌️
    </button>
  </div>
)

export default JoinWaitlistToast
