import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import React from "react"
import { useMessageContext } from "stream-chat-react"


// WARN: IEX called for each instance of a buy command message
// WARN: Should think about some how collecting the tickers referenced on the message list
// WARN: And passing these so we then call the api less

const InvestmentReceiptAttachment = ({ attachment }) => {
  const { message } = useMessageContext()

  const shares = parseFloat(message.text.split(" shares")[0])
  const localPrice = message.text.split("cost of ").pop().trim()
  const currencySymbol = localPrice.charAt(0)
  const action =
    message.text.split(" for")[0].split(" ").pop() === "sold" ? "sell" : "buy"
  const cost = parseFloat(localPrice.slice(1))

  // TODO: The receipt is colored by buy-sell instead of by the loss or gain. Which should
  // TODO: definitely be included in the message also!

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      <LogoPriceCardHeader
        tickerSymbol={attachment?.tickerSymbol?.toUpperCase()}
        tickerState={{
          action,
          shares,
          price: cost,
        }}
      />
      {/* <span className="uppercase text-brand font-primary">Complete</span> */}
    </div>
  )
}

export default InvestmentReceiptAttachment