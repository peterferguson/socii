import CheckIcon from "@components/BackgroundCheck"
import { RadioGroup } from "@headlessui/react"
import { tw } from "@utils/tw"
import React, { useState } from "react"

export default function OrderTypeSelector({ orderTypes, send, className = "" }) {
  const [orderTypeSelected, setOrderTypeSelected] = useState(null)

  const setSelectedOrderType = (order) => {
    send(order.actionName)
    setOrderTypeSelected(order.name)
  }

  return (
    <div className={`w-11/12 pl-8 flex-grow max-w-md sm:max-w-none ${className}`}>
      <RadioGroup value={orderTypeSelected} onChange={setSelectedOrderType}>
        <RadioGroup.Label className="sr-only">Order or Share?</RadioGroup.Label>
        <div className="flex-col flex-grow space-x-0 space-y-2 sm:space-y-4 sm:flex">
          {orderTypes.map((orderType, i: number) => (
            <RadioGroup.Option
              key={`${orderType}-${i}`}
              value={orderType}
              className={({ active }) =>
                tw(
                  "bg-white relative rounded-lg shadow-md px-4 py-2 cursor-pointer",
                  "focus:outline-none flex-1",
                  active &&
                    "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-brand ring-opacity-60",
                  `umami--click--invest-button-order-type-modal-${orderType.actionName
                    .replace(/\s/g, "")
                    .replace(/_/g, "-")
                    .toLowerCase()}-option`
                )
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center content-between">
                      <orderType.icon />
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? "text-brand" : "text-gray-900"
                          }`}
                        >
                          {orderType.name}
                        </RadioGroup.Label>
                        <div className="flex-grow" />
                        <RadioGroup.Description
                          as="span"
                          className={`flex flex-col ${
                            checked ? "text-light-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span className="text-tiny overflow-ellipsis">
                            {orderType.description}
                          </span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-brand">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
