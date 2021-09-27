import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import React, { useRef, useEffect, useState } from "react"
import { useMessageContext } from "stream-chat-react"

const InvestmentReceiptAttachment = ({ attachment }) => {
  const { message } = useMessageContext()

  const [tickerSymbol, setTickerSymbol] = useState<string>("")
  const shares = parseFloat(message.text.split(" shares")[0])
  const localPrice = message.text.split("cost of ").pop().trim()
  const action =
    message.text.split(" for")[0].split(" ").pop() === "sold" ? "sell" : "buy"
  const cost = parseFloat(localPrice.slice(1))

  useEffect(() => {
    typeof attachment.tickerSymbol === "string" &&
      setTickerSymbol(attachment.tickerSymbol)
  }, [attachment?.tickerSymbol])

  // TODO: The receipt is colored by buy-sell instead of by the loss or gain. Which should
  // TODO: definitely be included in the message also!

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      {attachment?.tickerSymbol && (
        <LogoPriceCardHeader
          tickerSymbol={tickerSymbol.toUpperCase()}
          action={action}
          shares={shares}
          price={cost}
        />
      )}
    </div>
  )
}

export default InvestmentReceiptAttachment
