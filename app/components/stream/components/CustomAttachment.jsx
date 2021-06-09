import { Attachment } from "stream-chat-react"
import {
  StockDisplayAttachment,
  InvestmentReceiptAttachment,
  TradeCommandAttachment,
  InvestCommandAttachment,
  InvestmentConfirmationAttachment,
} from "./CustomAttachments"
import React from "react"

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
      return <TradeCommandAttachment attachment={attachment} type={"buy"} />
    case "sell":
      return <TradeCommandAttachment attachment={attachment} type={"sell"} />
    default:
      break
  }

  return <Attachment {...props} />
}
