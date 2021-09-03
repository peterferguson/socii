import { InvisibleButton } from "@components/InvisibleButton"
import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useRef } from "react"

export const InvestButtonModalContainer = ({ children, open, send }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur-lg"
        open={open}
        initialFocus={closeButtonRef}
        onClose={() => send("CLOSE")}
      >
        <div className="relative min-h-screen px-4 text-center">
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
            {children}
          </Transition.Child>
        </div>
        <InvisibleButton buttonRef={closeButtonRef} />
      </Dialog>
    </Transition>
  )
}
