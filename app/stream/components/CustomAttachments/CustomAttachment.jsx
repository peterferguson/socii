import React from "react"
import { Attachment } from "stream-chat-react"
import {
  InvestmentConfirmationAttachmentDynamic,
  InvestmentReceiptAttachmentDynamic,
  StockDisplayAttachmentDynamic,
  TradeCommandAttachmentDynamic,
} from "."

export default function CustomAttachment(props) {
  const { attachments } = props
  const [attachment] = attachments || []

  switch (attachment?.type) {
    case "receipt":
      return <InvestmentReceiptAttachmentDynamic attachment={attachment} />
    case "investmentConfirmation":
      return <InvestmentConfirmationAttachmentDynamic attachment={attachment} />
    case "stock":
      return <StockDisplayAttachmentDynamic attachment={attachment} />
    // TODO: Readd the invest chat command to stream then uncomment this
    // case "invest":
    //   return <InvestCommandAttachmentDynamic attachment={attachment} />
    case "buy":
      return <TradeCommandAttachmentDynamic attachment={attachment} tradeType={"buy"} />
    case "sell":
      return (
        <TradeCommandAttachmentDynamic attachment={attachment} tradeType={"sell"} />
      )
    default:
      break
  }

  return <Attachment {...props} />
}
