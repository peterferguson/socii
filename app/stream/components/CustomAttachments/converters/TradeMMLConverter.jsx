import React, { useState } from "react"
import MMLButton from "../../../MML/Button"
import { MMLNumberInput } from "../../../MML/NumberInput"

const TradeMMLConverter = ({ tagKey, costPerShare, tradeType }) => {
  const [amount, setAmount] = useState(costPerShare)
  const handleChange = (e) => setAmount(e.target.value)

  return (
    <div className="flex flex-col">
      <MMLNumberInput
        name={"Amount"}
        key={`${tagKey}-amount`}
        onChange={handleChange}
        value={amount}
      />
      <div className="flex flex-row mt-1">
        <MMLButton
          key={`cancel-button`}
          name="cancel"
          className="flex-grow mx-2 outline-btn btn-transition hover:bg-red-400"
          text="Cancel"
        />
        <MMLButton
          key={`${tradeType}-button`}
          name={tradeType}
          className="flex-grow mx-2 outline-btn btn-transition"
          text={tradeType.charAt(0)?.toUpperCase() + tradeType.slice(1)}
        />
      </div>
    </div>
  )
}

export default React.memo(TradeMMLConverter)
