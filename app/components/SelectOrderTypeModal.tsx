import OrderTypeSelector from "@components/OrderTypeSelector"
import { Dialog } from "@headlessui/react"
import React from "react"
import { AiOutlineNumber } from "react-icons/ai"
import { FaDollarSign } from "react-icons/fa"
import { HiOutlineArrowNarrowDown } from "react-icons/hi"
import { InvestButtonModalContainer } from "./InvestButtonModalContainer"

const SelectOrderTypeModal = ({ ticker, state, send }) => (
  <InvestButtonModalContainer
    open={state.matches("active.orderType")}
    onClose={() => send("CLOSE")}
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
  </InvestButtonModalContainer>
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
