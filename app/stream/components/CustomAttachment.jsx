import dynamic from "next/dynamic"
import React from "react"
import { Attachment } from "stream-chat-react"

const InvestCommandAttachment = dynamic(
  () => import("./CustomAttachments/InvestCommandAttachment"),
  { ssr: false }
)
const InvestmentConfirmationAttachment = dynamic(
  () => import("./CustomAttachments/InvestmentConfirmationAttachment"),
  { ssr: false }
)
const InvestmentReceiptAttachment = dynamic(
  () => import("./CustomAttachments/InvestmentReceiptAttachment"),
  { ssr: false }
)
const StockDisplayAttachment = dynamic(
  () => import("./CustomAttachments/StockDisplayAttachment"),
  { ssr: false }
)
const TradeCommandAttachment = dynamic(
  () => import("./CustomAttachments/TradeCommandAttachment"),
  { ssr: false }
)

export default function CustomAttachment(props) {
  const { attachments } = props
  const [attachment] = attachments || []
  console.log(attachment)

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
