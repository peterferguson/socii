import { Attachment } from "stream-chat-react"
import {
  StockDisplayAttachment,
  SellCommandAttachment,
  InvestmentReceiptAttachment,
  BuyCommandAttachment,
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
      return <BuyCommandAttachment attachment={attachment} />
    case "sell":
      return <SellCommandAttachment attachment={attachment} />
    default:
      break
  }

  return <Attachment {...props} />
}
