import InvestActionSelector from "@components/InvestActionSelector"
import { InvestButtonModalContainer } from "@components/InvestButtonModalContainer"
import { Dialog } from "@headlessui/react"
import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { HiShare } from "react-icons/hi"

const SelectInvestActionModal = ({ ticker, state, send }) => (
  <InvestButtonModalContainer
    open={state.matches("active.investAction")}
    onClose={() => send("CLOSE")}
  >
    <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
      <Dialog.Title
        as="h3"
        className="pb-4 text-lg font-medium text-gray-900 font-primary"
      >
        Select an action:
      </Dialog.Title>
      <div className="mt-2">
        <InvestActionSelector
          actions={actions(ticker.tickerSymbol).filter((k) =>
            !state.context.hasHolding ? k.name.match(/Buy|Share/) : true
          )}
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

const actions = (tickerSymbol) => [
  {
    icon: () => (
      <div className="p-2 rounded-full bg-brand-lightTeal mr-1.5 sm:mr-2">
        <FaArrowUp className="w-6 h-6 text-teal-400" />
      </div>
    ),
    name: `Buy ${tickerSymbol}`,
    description: `
    Buy as little as $1 of ${tickerSymbol} shares
    `,
    actionName: "CHOOSE_BUY",
  },
  {
    icon: () => (
      <div className="p-2 rounded-full bg-brand/30 mr-1.5 sm:mr-2">
        <FaArrowDown className="w-6 h-6 text-brand-cyan-vivid" />
      </div>
    ),

    name: `Sell ${tickerSymbol}`,
    description: `
    Sell as little as 0.000000001 ${tickerSymbol} shares
    `,
    actionName: "CHOOSE_SELL",
  },
  {
    icon: () => (
      <div className="p-2 rounded-full bg-brand-light-secondary mr-1.5 sm:mr-2">
        <HiShare className="w-6 h-6 text-brand" />
      </div>
    ),
    name: `Share ${tickerSymbol} with a group`,
    description: `
    Tell your friends about ${tickerSymbol}
    `,
    actionName: "CHOOSE_SHARE",
  },
]

export default SelectInvestActionModal
