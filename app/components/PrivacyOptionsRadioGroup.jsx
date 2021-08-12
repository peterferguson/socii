import CheckIcon from "@components/BackgroundCheck"
import { RadioGroup } from "@headlessui/react"
import { groupPrivacyOptions } from "@lib/constants"
import React from "react"

export const PrivacyOptionsRadioGroup = ({
  className,
  privacyOption,
  setPrivacyOption,
}) => (
  <div className={`w-11/12 ml-4 mt-4 flex-grow max-w-md sm:max-w-none ${className}`}>
    <RadioGroup value={privacyOption} onChange={setPrivacyOption}>
      <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
      <div className="flex-col flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 sm:flex sm:flex-row">
        {groupPrivacyOptions.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({
              active,
            }) => `bg-white relative rounded-lg shadow-md border border-gray-200 px-5 py-4 cursor-pointer \
              focus:outline-none flex-1
              ${
                active
                  ? "ring-2 ring-offset-2 ring-offset-light-blue-300 \
                       ring-brand ring-opacity-60 border-none"
                  : ""
              }`}
          >
            {({ checked }) => (
              <>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium  ${
                          checked ? "text-brand" : "text-gray-900"
                        }`}
                      >
                        {option.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={`inline ${checked ? "text-black" : "text-gray-500"}`}
                      >
                        <span>{option.description}</span>
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
