import { Attachment } from "stream-chat-expo"
import InvestmentConfirmationAttachment from "./InvestmentConfirmationAttachment"
import InvestmentReceiptAttachment from "./InvestmentReceiptAttachment"
import StockDisplayAttachment from "./StockDisplayAttachment"
import TradeCommandAttachment from "./TradeCommandAttachment"
import { useEffect, useState } from "react"
import React from "react"
import { getTickerISIN } from "app/lib/firebase/db"
import { useChatContext, useMessageContext } from "stream-chat-expo"

export default function CustomAttachment(props) {
  const { attachment } = props

  const [mounted, setMounted] = useState(false)
  const symbol =
    attachment?.tickerSymbol?.toUpperCase() || attachment?.symbol?.toUpperCase()
  const [isin, setIsin] = useState(attachment?.isin)
  
  const { client } = useChatContext()
  const { message } = useMessageContext()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    !isin && mounted && getTickerISIN(symbol).then(setIsin)
  }, [isin, mounted])

  useEffect(() => {
    // - On first load of the isin store it in the message attachment data
    if (isin && !attachment?.isin) {
      client
        .partialUpdateMessage(message.id, {
          set: { attachments: [{ ...attachment, isin, symbol }] },
        })
        .then(() => console.log("Saved isin to message meta"))
    }
  }, [isin])

  switch (attachment?.type) {
    case "receipt":
      return <InvestmentReceiptAttachment attachment={attachment} />
    case "investmentConfirmation":
      return <InvestmentConfirmationAttachment attachment={attachment} />
    case "stock":
      return <StockDisplayAttachment attachment={attachment} />
    // TODO: Read the invest chat command to stream then uncomment this
    // case "invest":
    //   return <InvestCommandAttachment attachment={attachment} />
    case "buy":
      return <TradeCommandAttachment attachment={attachment} tradeType={"buy"} />
    case "sell":
      return <TradeCommandAttachment attachment={attachment} tradeType={"sell"} />
    default:
      break
  }

  return <Attachment {...props} />
}
