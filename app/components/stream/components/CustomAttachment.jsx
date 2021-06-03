import { Attachment } from "stream-chat-react"
import StockDisplayAttachment from "./CustomAttachments/StockDisplayAttachment"
import SellCommandAttachment from "./CustomAttachments/SellCommandAttachment"
import InvestmentReceiptAttachment from "./CustomAttachments/InvestmentReceiptAttachment"
import BuyCommandAttachment from "./CustomAttachments/BuyCommandAttachment"
import InvestCommandAttachment from "./CustomAttachments/InvestCommandAttachment"
import React from "react"

export default function CustomAttachment(props) {
  const { attachments, actionHandler } = props
  const [attachment] = attachments || []

  switch (attachment?.type) {
    case "receipt":
      return <InvestmentReceiptAttachment attachment={attachment} />
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
