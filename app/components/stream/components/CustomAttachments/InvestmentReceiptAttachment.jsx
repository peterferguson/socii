// import { currencyIcons } from "@lib/constants"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import { UserContext } from "@lib/context"
import React, { useContext } from "react"

// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

import { FaDollarSign, FaPoundSign, FaYenSign, FaEuroSign } from "react-icons/fa"
export const currencyIcons = {
  AUD: { icon: FaDollarSign },
  CAD: { icon: FaDollarSign },
  // CHF: "CHF",
  EUR: { icon: FaEuroSign },
  GBP: { icon: FaPoundSign },
  JPY: { icon: FaYenSign },
  USD: { icon: FaDollarSign },
}

const InvestmentReceiptAttachment = ({ attachment }) => {
  const { username } = useContext(UserContext)

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment?.tickerSymbol.toUpperCase()}
        tickerState={tickerState}
      />

    </div>
  )
}

export default InvestmentReceiptAttachment
