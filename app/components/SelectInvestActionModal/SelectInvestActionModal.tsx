import InvestActionSelector from "@components/InvestActionSelector"
import { Dialog } from "@headlessui/react"
import React from "react"
import { Actions } from "./Actions"

const SelectInvestActionModal = ({ ticker, state, send }) => (
  <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
    <Dialog.Title
      as="h3"
      className="pb-4 text-lg font-medium text-gray-900 font-primary"
    >
      Select an action:
    </Dialog.Title>
    <div className="mt-2">
      <InvestActionSelector
        actions={Actions(ticker?.tickerSymbol).filter((k) =>
          !state.context.hasHolding ? k.name.match(/Buy|Share/) : true
        )}
        send={send}
      />
    </div>
  </div>
)

export default SelectInvestActionModal
