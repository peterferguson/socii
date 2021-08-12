import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const returnToLastScreenModal = ({ state, send }) => (
  <Transition appear show={state.matches("returnToLastScreen")} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur-lg"
      open={state.matches("returnToLastScreen")}
      onClose={() => send("CLOSE")}
    >
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-2xl font-medium text-gray-600 font-primary leading-6"
            >
              You are back!
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-gray-500 text-tiny sm:text-sm">
                You previously clicked this button. Would you like to pick up where you
                left off?
              </p>
            </div>

            <div className="flex items-center justify-center mx-auto mt-4 font-medium text-tiny sm:text-sm">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 mx-2 text-blue-800 bg-blue-100 border border-transparent sm:mx-8 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => send("DISAGREE")}
              >
                No, start over!
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 mx-2 text-red-800 bg-red-200 border border-transparent sm:mx-8 rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={() => send("AGREE")}
              >
                Yes
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
)

export default returnToLastScreenModal
