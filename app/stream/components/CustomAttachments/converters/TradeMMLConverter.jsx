import { useShareCost } from "@hooks/useShareCost"
import React from "react"
import MMLButton from "../MML/Button"
import { MMLNumberInput } from "../MML/NumberInput"

export const TradeMMLConverter = ({ tagKey, costPerShare, tradeType }) => {
  const [shares, handleChange, toCost] = useShareCost(costPerShare)

  return (
    <div className="flex flex-col">
      {/* <MMLNumberInput
        name={"Shares"}
        key={`${tagKey}-shares`}
        value={shares}
        onChange={handleChange}
        decimals={8}
      /> */}
      <MMLNumberInput
        name={"Amount"}
        key={`${tagKey}-amount`}
        //value={toCost(shares)}
        onChange={handleChange}
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
