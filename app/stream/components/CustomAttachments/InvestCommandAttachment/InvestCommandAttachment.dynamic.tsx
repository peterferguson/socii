import dynamic from "next/dynamic"
import InvestCommandAttachment from "./InvestCommandAttachment"

export const InvestCommandAttachmentDynamic = dynamic(
  () => import("./InvestCommandAttachment"),
  {
    ssr: false,
  }
) as typeof InvestCommandAttachment
