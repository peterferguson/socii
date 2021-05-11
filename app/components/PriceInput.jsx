import { useState } from "react";

export default function PriceInput(pricePlaceholder = "0.00") {
  const currencySymbols = {
    USD: "$",
    GBP: "£",
    EUR: "€",
  };
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Price
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            currencySymbols[selectedCurrency]
          </span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder={pricePlaceholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            {Object.keys(currencySymbols).map((currency) => (
              <option>{currency}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
