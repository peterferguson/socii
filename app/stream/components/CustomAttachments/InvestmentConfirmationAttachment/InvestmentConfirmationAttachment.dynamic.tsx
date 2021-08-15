import dynamic from "next/dynamic"
import InvestmentConfirmationAttachment from "./InvestmentConfirmationAttachment"

export const InvestmentConfirmationAttachmentDynamic = dynamic(
  () => import("./InvestmentConfirmationAttachment"),
  {
    ssr: false,
  }
) as typeof InvestmentConfirmationAttachment
