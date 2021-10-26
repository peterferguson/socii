import { Attachment } from "stream-chat-expo"
import InvestmentConfirmationAttachment from "./InvestmentConfirmationAttachment"
import InvestmentReceiptAttachment from "./InvestmentReceiptAttachment"
import StockDisplayAttachment from "./StockDisplayAttachment"
import TradeCommandAttachment from "./TradeCommandAttachment"

import React from "react"

export default function CustomAttachment(props) {
  const { attachment } = props

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
      // return <TradeCommandAttachment attachment={attachment} tradeType={"sell"} />
      return null
    default:
      break
  }

  return <Attachment {...props} />
}
