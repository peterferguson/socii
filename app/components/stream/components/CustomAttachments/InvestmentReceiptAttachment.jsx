// import { currencyIcons } from "@lib/constants"
import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import React from "react"

import { useMessageContext } from "stream-chat-react"

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
  const { message } = useMessageContext()

  const shares = parseFloat(message.text.split(" shares")[0])
  const price = parseFloat(message.text.split("for ").pop().split(" per share")[0])

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment?.tickerSymbol?.toUpperCase()}
        price={price}
        shares={shares}
      />
      {/* <span className="uppercase text-brand font-poppins">Complete</span> */}
    </div>
  )
}

export default InvestmentReceiptAttachment
