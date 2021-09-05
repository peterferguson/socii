import { InvestButtonModalContainer } from "@components/InvestButtonModal/InvestButtonModalContainer"
import OrderTypeSelector from "@components/OrderTypeSelector"
import { Dialog } from "@headlessui/react"
import React from "react"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ ticker, state, send }) => (
  <InvestButtonModalContainer open={state.matches("active.orderType")} send={send}>
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
      {/* <div className="flex mt-4">
              <div className="flex-grow" />
              <button
                type="button"
                className="justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent \ rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                onClick={() => {}}
              >
                Yes, Lets go! 🚀
              </button>
            </div>
          </div> */}
    </div>
  </InvestButtonModalContainer>
)

export default React.memo(SelectOrderTypeModal)
