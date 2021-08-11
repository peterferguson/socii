import CheckIcon from "@components/BackgroundCheck"
import { RadioGroup } from "@headlessui/react"
import React from "react"
import { FaDollarSign } from "react-icons/fa"

// TODO: Add dropdown for mobile view with input values also
export const AmountOptionsRadioGroup = ({
  className,
  AmountOptions,
  amountOption,
  setAmountOption,
  srLabel,
}) => (
  <div className={`w-11/12 mt-4 flex-grow max-w-md sm:max-w-none ${className}`}>
    <RadioGroup value={amountOption} onChange={setAmountOption}>
      <RadioGroup.Label className="sr-only">{srLabel}</RadioGroup.Label>
      <div className="flex-col flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 \ sm:flex sm:flex-row">
        {AmountOptions.map((option) => (
          <RadioGroup.Option
            key={option.amount}
            value={option}
            className={({ active }) => `${
              active
                ? "ring-2 ring-offset-2 ring-offset-light-blue-300 \
                         ring-brand ring-opacity-60"
                : ""
            }
                     bg-white relative rounded-lg shadow-md px-4 py-2 cursor-pointer \
                     focus:outline-none flex-1`}
          >
            {({ checked }) => (
              <>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium text-lg sm:text-base ${
                          checked ? "text-brand" : "text-gray-900"
                        }`}
                      >
                        <FaDollarSign />
                        {option.amount}
                      </RadioGroup.Label>
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
