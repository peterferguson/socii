import dynamic from "next/dynamic"
import InvestmentReceiptAttachment from "./InvestmentReceiptAttachment"

export const InvestmentReceiptAttachmentDynamic = dynamic(
  () => import("./InvestmentReceiptAttachment"),
  {
    ssr: false,
  }
) as typeof InvestmentReceiptAttachment
