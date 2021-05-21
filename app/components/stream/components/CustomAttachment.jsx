import { Attachment } from "stream-chat-react"
import StockDisplayAttachment from "@components/stream/components/CustomAttachments/StockDisplayAttachment"
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
    case "mml":
      return (
        <InvestCommandAttachment attachment={{ ...attachment, tickerSymbol: "TSLA" }} />
      )
    default:
      break
  }

  return <Attachment {...props} />
}
