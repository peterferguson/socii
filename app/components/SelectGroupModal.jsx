import GroupSelectorRadioGroup from "@components/GroupSelector"
import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

export default function SelectGroupModal({
  userGroups,
  openGroupModal,
  setOpenGroupModal,
  goClickHandler = () => {},
}) {
  const closeModal = () => setOpenGroupModal(false)

  const letsGoClickHander = () => {
    closeModal()
    goClickHandler()
  }

  return (
    <Transition appear show={openGroupModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-lg"
        open={openGroupModal}
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
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
              <Dialog.Title
                as="h3"
                className="pb-4 text-lg font-medium text-gray-900 font-primary"
              >
                Select a group to invest with:
              </Dialog.Title>
              <div className="mt-2">
                <GroupSelectorRadioGroup groupNames={userGroups} />
              </div>
              <div className="flex mt-4">
                <div className="flex-grow" />
                <button
                  type="button"
                  className="justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent \ rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                  onClick={letsGoClickHander}
                >
                  Yes, Lets go! 🚀
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
