import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { HiShare } from "react-icons/hi"

export const Actions = (tickerSymbol) => [
  {
    icon: () => (
      <div className="p-2 rounded-full bg-brand-lightTeal mr-1.5 sm:mr-2">
        <FaArrowUp className="w-6 h-6 text-teal-400" />
      </div>
    ),
    name: `Buy ${tickerSymbol}`,
    description: `
    Buy as little as $1 of ${tickerSymbol} shares
    `,
    actionName: "CHOOSE_BUY",
  },
  {
    icon: () => (
      <div className="p-2 rounded-full bg-brand/30 mr-1.5 sm:mr-2">
        <FaArrowDown className="w-6 h-6 text-brand-cyan-vivid" />
      </div>
    ),

    name: `Sell ${tickerSymbol}`,
    description: `
    Sell as little as 0.000000001 ${tickerSymbol} shares
    `,
    actionName: "CHOOSE_SELL",
  },
  {
    icon: () => (
      <div className="p-2 rounded-full bg-brand-light-secondary mr-1.5 sm:mr-2">
        <HiShare className="w-6 h-6 text-brand" />
      </div>
    ),
    name: `Share ${tickerSymbol} with a group`,
    description: `
    Tell your friends about ${tickerSymbol}
    `,
    actionName: "CHOOSE_SHARE",
  },
]
