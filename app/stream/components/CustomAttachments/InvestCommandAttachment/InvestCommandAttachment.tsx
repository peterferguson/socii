import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { usePositions } from "@hooks"
import { Position } from "@models/alpaca/Position"
import React, { useEffect, useRef, useState } from "react"
import MMLButton from "../../../MML/Button"

const InvestCommandAttachment = ({ attachment }) => {
  const tickerSymbol = useRef(attachment?.tickerSymbol?.toUpperCase())
  const [holding, setHolding] = useState<Position>(null)

  const { positions, error } = usePositions()

  useEffect(() => {
    const position = positions
      ?.filter((position) => position.symbol === tickerSymbol.current)
      .pop()
    if (position) setHolding(position)
  }, [positions])

  return (
    <div className="py-4 pl-4 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader tickerSymbol={tickerSymbol.current} />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row">
          {holding && (
            <MMLButton
              key={`sell-button`}
              name="sell"
              className="w-24 mx-2 outline-btn btn-transition"
              text="Sell"
            />
          )}
          <MMLButton
            key={`buy-button`}
            name="buy"
            className={`mx-2 outline-btn btn-transition ${holding ? "w-24" : "w-52"}`}
            text={"Buy"}
          />
        </div>

        <MMLButton
          key={`cancel-button`}
          name="cancel"
          className="mx-2 w-52 outline-btn btn-transition hover:bg-red-400"
          text="Cancel"
        />
      </div>
    </div>
  )
}

export default InvestCommandAttachment
