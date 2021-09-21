import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

const InformationModal = ({
  isOpen,
  closeModal,
  InformationModalIcon,
  InformationText,
  informationTitle,
}: {
  isOpen: boolean
  closeModal: () => void
  InformationModalIcon: React.FC
  informationTitle: string
  InformationText: string | React.FC
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      open={isOpen}
      className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur-xs"
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
              className="flex items-center justify-center space-x-4"
            >
              {InformationModalIcon && <InformationModalIcon />}
              <div className="text-xl font-medium text-center text-gray-900 leading-6">
                {informationTitle}
              </div>
            </Dialog.Title>
            <div className="mt-4">
              <p className="text-sm text-center text-gray-400">
                {typeof InformationText === "string" ? (
                  InformationText
                ) : (
                  <InformationText />
                )}
              </p>
            </div>

            <div className="flex items-center justify-center mx-auto mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                onClick={closeModal}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
)

export default InformationModal
