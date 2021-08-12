import OrderTypeSelector from "@components/OrderTypeSelector"
import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { AiOutlineNumber } from "react-icons/ai"
import { FaDollarSign } from "react-icons/fa"
import { HiOutlineArrowNarrowDown } from "react-icons/hi"

const SelectOrderTypeModal = ({ ticker, state, send }) => (
  <Transition appear show={state.matches("active.orderType")} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-lg"
      open={state.matches("active.ordeType")}
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
          <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
            <Dialog.Title
              as="h3"
              className="pb-4 text-lg font-medium text-gray-900 font-primary"
            >
              Select an order type:
            </Dialog.Title>
            <div className="mt-2">
              <OrderTypeSelector
                orderTypes={orderTypes(ticker.tickerSymbol, state.context.side)}
                send={send}
              />
            </div>
            <div className="flex mt-4">
              <div className="flex-grow" />
              <button
                type="button"
                className="justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent \ rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                onClick={() => {}}
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

const orderTypes = (tickerSymbol, side) => {
  const capitalSide = side === "buy" ? "Buy" : "Sell"
  return [
    {
      icon: () => (
        <div className="p-2 rounded-full bg-brand-lightTeal mr-1.5 sm:mr-2">
          <FaDollarSign className="w-6 h-6 text-teal-400" />
        </div>
      ),
      name: `${capitalSide} specific cash amount`,
      description: `${capitalSide} as little as $1 of ${tickerSymbol} shares`,
      actionName: "SELECT_CASH_ORDER",
    },
    {
      icon: () => (
        <div className="p-2 rounded-full bg-brand/30 mr-1.5 sm:mr-2">
          <AiOutlineNumber className="w-6 h-6 text-brand-cyan-vivid" />
        </div>
      ),
      name: `${capitalSide} specific amount of shares`,
      description: `${capitalSide} as little as 0.000000001 ${tickerSymbol} shares`,
      actionName: "SELECT_SHARE_ORDER",
    },
    {
      icon: () => (
        <div className="p-2 bg-pink-200 rounded-full mr-1.5 sm:mr-2">
          <HiOutlineArrowNarrowDown className="w-6 h-6 -rotate-45 text-brand-pink" />
        </div>
      ),
      name: `${capitalSide} if ${tickerSymbol} reaches a specified price or lower`,
      description: `
    ${capitalSide} ${tickerSymbol} using a limit order.
    No fractionals and at least 1 share
    `,
      actionName: "SELECT_LIMIT_ORDER",
    },
  ]
}

export default SelectOrderTypeModal
