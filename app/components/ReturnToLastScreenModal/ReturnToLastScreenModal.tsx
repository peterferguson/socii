import { Dialog } from "@headlessui/react"
import { tw } from "@utils/tw"
import React from "react"

const ReturnToLastScreenModal = ({ send }) => (
  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
    <Dialog.Title
      as="h3"
      className="text-2xl font-medium text-gray-600 font-primary leading-6"
    >
      You are back!
    </Dialog.Title>
    <div className="mt-2">
      <p className="text-gray-500 text-tiny sm:text-sm">
        You previously clicked this button. Would you like to pick up where you left
        off?
      </p>
    </div>
    <div className="flex items-center justify-center mx-auto mt-4 font-medium text-tiny sm:text-sm">
      <button
        className={tw(
          "inline-flex justify-center px-4 py-2 mx-2 text-red-800 bg-red-200",
          "border border-transparent sm:mx-8 rounded-md hover:bg-red-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500",
          "umami--click--invest-button-return-to-last-screen-modal-no-action"
        )}
        onClick={() => send("DISAGREE")}
      >
        No, start over!
      </button>
      <button
        className={tw(
          "inline-flex justify-center px-4 py-2 mx-2 text-blue-800 bg-blue-100",
          "border border-transparent sm:mx-8 rounded-md hover:bg-blue-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
          "umami--click--invest-button-return-to-last-screen-modal-yes-action"
        )}
        onClick={() => send("AGREE")}
      >
        Yes
      </button>
    </div>
  </div>
)

export default React.memo(ReturnToLastScreenModal)
