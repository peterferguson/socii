import React from "react"
import { FaDollarSign } from "react-icons/fa"

const MMLNumberInput = ({ tagKey, value, onChange, name, decimals = 2 }) => (
  <div className="flex flex-row m-2 border rounded shadow">
    <span
      key={tagKey}
      className="flex items-center px-3 text-sm font-bold rounded rounded-r-none sm:text-base font-primary bg-grey-200 text-grey-400"
    >
      {name}
      <FaDollarSign className="ml-2 mb-0.5" />
    </span>
    <input
      type="number"
      pattern={`[0-9]+([.,][0-9]+)?{,${decimals}}`}
      label={name.toLowerCase()}
      name={name.toLowerCase()}
      className="w-full py-2 text-sm font-bold text-right border-none rounded sm:text-base focus-within:outline-none focus-within:border-none focus-within:ring-0"
      value={value || 0}
      onChange={onChange}
      formNoValidate={true}
    />
  </div>
)

export default React.memo(MMLNumberInput)
