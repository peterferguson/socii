import React from "react"
import { AiOutlineNumber } from "react-icons/ai"
import { FaDollarSign } from "react-icons/fa"
import { HiOutlineArrowNarrowDown } from "react-icons/hi"

export const OrderTypes = (tickerSymbol, side) => {
  const capitalSide = side === "buy" ? "Buy" : "Sell"
  return [
    {
      icon: () => (
        <div className="p-2 rounded-full bg-brand-lightTeal mr-1.5 sm:mr-2">
          <FaDollarSign className="w-6 h-6 text-teal-400" />
        </div>
      ),
      name: `${capitalSide} specific cash amount`,
      description: `${capitalSide} as little as $1 of ${tickerSymbol} shares`,
      actionName: "SELECT_CASH_ORDER",
    },
    {
      icon: () => (
        <div className="p-2 rounded-full bg-brand/30 mr-1.5 sm:mr-2">
          <AiOutlineNumber className="w-6 h-6 text-brand-cyan-vivid" />
        </div>
      ),
      name: `${capitalSide} specific amount of shares`,
      description: `${capitalSide} as little as 0.000000001 ${tickerSymbol} shares`,
      actionName: "SELECT_SHARE_ORDER",
    },
    {
      icon: () => (
        <div className="p-2 bg-pink-200 rounded-full mr-1.5 sm:mr-2">
          <HiOutlineArrowNarrowDown className="w-6 h-6 -rotate-45 text-brand-pink" />
        </div>
      ),
      name: `${capitalSide} if ${tickerSymbol} reaches a specified price or lower`,
      description: `
    ${capitalSide} ${tickerSymbol} using a limit order.
    No fractionals and at least 1 share
    `,
      actionName: "SELECT_LIMIT_ORDER",
    },
  ]
}
