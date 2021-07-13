import React from "react"
import { Attachment } from "stream-chat-react"
import {
    InvestCommandAttachment,
    InvestmentConfirmationAttachment, InvestmentReceiptAttachment, StockDisplayAttachment, TradeCommandAttachment
} from "./CustomAttachments"

export default function CustomAttachment(props) {
  const { attachments } = props
  const [attachment] = attachments || []

  switch (attachment?.type) {
    case "receipt":
      return <InvestmentReceiptAttachment attachment={attachment} />
    case "investmentConfirmation":
      return <InvestmentConfirmationAttachment attachment={attachment} />
    case "stock":
      return <StockDisplayAttachment attachment={attachment} />
    case "invest":
      return <InvestCommandAttachment attachment={attachment} />
    case "buy":
      return <TradeCommandAttachment attachment={attachment} tradeType={"buy"} />
    case "sell":
      return <TradeCommandAttachment attachment={attachment} tradeType={"sell"} />
    default:
      break
  }

  return <Attachment {...props} />
}
