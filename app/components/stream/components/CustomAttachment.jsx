import { Attachment } from "stream-chat-react"
import StockDisplayAttachment from "@components/stream/components/CustomAttachments/StockDisplayAttachment"
import SellCommandAttachment from "./CustomAttachments/SellCommandAttachment"
import BuyCommandAttachment from "./CustomAttachments/BuyCommandAttachment"
import InvestCommandAttachment from "./CustomAttachments/InvestCommandAttachment"
import React from "react"

export default function CustomAttachment(props) {
  const { attachments } = props
  const [attachment] = attachments || []

  console.log(attachment)

  switch (attachment?.type) {
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
