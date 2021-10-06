import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const DeleteChannelModal = ({
  showDelete: isOpen,
  setShowDelete: setIsOpen,
  deleteChannel,
}) => {
  const closeModal = () => setIsOpen(false)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur"
        onClose={closeModal}
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
                className="text-lg font-medium text-red-600 leading-6"
              >
                Delete Channel
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-gray-500 text-tiny sm:text-sm">
                  Are you sure you want to delete this channel? This action is
                  irreversible & will delete the channel for all members!
                </p>
              </div>

              <div className="flex items-center justify-center mx-auto mt-4 font-medium text-tiny sm:text-sm">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mx-2 text-blue-800 bg-blue-100 border border-transparent sm:mx-8 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  No, take me back!
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mx-2 text-red-800 bg-red-100 border border-transparent sm:mx-8 rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={deleteChannel}
                >
                  Yes, delete!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteChannelModal
