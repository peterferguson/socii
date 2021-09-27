import OrderTypeSelector from "@components/OrderTypeSelector"
import { Dialog } from "@headlessui/react"
import React from "react"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ ticker, state, send }) => (
  <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
    <Dialog.Title
      as="h3"
      className="pb-4 text-lg font-medium text-gray-900 font-primary"
    >
      Select an order type:
    </Dialog.Title>
    <div className="mt-2">
      <OrderTypeSelector
        orderTypes={OrderTypes(ticker.tickerSymbol, state.context.side)}
        send={send}
      />
    </div>
  </div>
)

export default React.memo(SelectOrderTypeModal)
