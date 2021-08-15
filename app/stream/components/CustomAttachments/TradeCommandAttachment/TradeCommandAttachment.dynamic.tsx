import dynamic from "next/dynamic"
import TradeCommandAttachment from "./TradeCommandAttachment"

export const TradeCommandAttachmentDynamic = dynamic(
  () => import("./TradeCommandAttachment"),
  {
    ssr: false,
  }
) as typeof TradeCommandAttachment
