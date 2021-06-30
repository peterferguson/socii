import React, { useState } from "react"
import { currencySymbols } from "@lib/constants"

export default function PriceInput({
  setPrice,
  pricePlaceholder = "0.00",
  defaultCurrency = "USD",
  textStyling = "font-poppins text-sm text-blueGray-500",
  showPrice = true,
}) {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency)

  return (
    <div className="text-blueGray-500">
      {showPrice && (
        <label htmlFor="price" className={`block ${textStyling}`}>
          Price
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            {currencySymbols[selectedCurrency]}
          </span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full pr-12 border-gray-300 appearance-none focus:ring-teal-500 focus:border-teal-500 pl-7 sm:text-sm rounded-md"
          placeholder={pricePlaceholder}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            onChange={(e) => {
              setSelectedCurrency(e.target.value)
            }}
            className="h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent focus:ring-teal-500 focus:border-teal-500 pr-7 sm:text-sm rounded-md"
          >
            {Object.keys(currencySymbols).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
