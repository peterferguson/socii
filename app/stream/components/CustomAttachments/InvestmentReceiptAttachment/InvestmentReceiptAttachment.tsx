import LogoPriceCardHeader from "@components/LogoPriceCardHeader"
import React, { useEffect, useState } from "react"
import { useMessageContext } from "stream-chat-react"

const InvestmentReceiptAttachment = ({ attachment }) => {
  const { message } = useMessageContext()

  const [tickerSymbol, setTickerSymbol] = useState<string>("")
  const cost = parseFloat(message.text.split("cost of ").pop().trim().slice(1))
  const pending = message.text.includes("IS PENDING")
  const action =
    message.text.split(" for")[0].split(" ").pop() === "sold" ? "sell" : "buy"
  const purchasePrice = parseFloat(
    message.text.split("for ").pop().split(" ").shift().slice(1)
  )

  useEffect(() => {
    typeof attachment.tickerSymbol === "string" &&
      setTickerSymbol(attachment.tickerSymbol)
  }, [attachment?.tickerSymbol])

  return (
    <div className="p-4 mb-2 bg-white rounded-lg shadow-lg">
      {attachment?.tickerSymbol && (
        <LogoPriceCardHeader
          tickerSymbol={tickerSymbol.toUpperCase()}
          cost={cost}
          purchasePrice={purchasePrice}
        />
      )}
    </div>
  )
}

export default InvestmentReceiptAttachment
