import React from "react"

const PriceInput = ({
  setPrice,
  pricePlaceholder = "0.00",
  textStyling = "font-primary text-sm text-blueGray-500",
  showPrice = true,
}) => (
  <div className="text-blueGray-500">
    {showPrice && (
      <label htmlFor="price" className={`block ${textStyling}`}>
        Price
      </label>
    )}
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="text"
        name="price"
        id="price"
        className="block w-full pr-12 border-gray-300 appearance-none focus:ring-teal-500 focus:border-teal-500 pl-7 sm:text-sm rounded-md"
        placeholder={pricePlaceholder}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  </div>
)

export default PriceInput
