import { Attachment } from "stream-chat-react"
import StockDisplayAttachment from "@components/stream/components/CustomAttachments/StockDisplayAttachment"
import SellCommandAttachment from "./CustomAttachments/SellCommandAttachment"
import BuyCommandAttachment from "./CustomAttachments/BuyCommandAttachment"
import InvestCommandAttachment from "./CustomAttachments/InvestCommandAttachment"
import React from "react"

export default function CustomAttachment(props) {
  const { attachments, actionHandler } = props
  const [attachment] = attachments || []

  switch (attachment?.type) {
    case "stock":
      return (
        <StockDisplayAttachment attachment={attachment} actionHandler={actionHandler} />
      )
    case "invest":
      return (
        <InvestCommandAttachment
          attachment={attachment}
          actionHandler={actionHandler}
        />
      )
    case "buy":
      return (
        <BuyCommandAttachment attachment={attachment} actionHandler={actionHandler} />
      )
    case "sell":
      return (
        <SellCommandAttachment attachment={attachment} actionHandler={actionHandler} />
      )
    default:
      break
  }

  return <Attachment {...props} />
}
