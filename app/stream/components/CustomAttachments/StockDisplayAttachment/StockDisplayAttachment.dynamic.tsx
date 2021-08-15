import dynamic from "next/dynamic"
import StockDisplayAttachment from "./StockDisplayAttachment"

export const StockDisplayAttachmentDynamic = dynamic(
  () => import("./StockDisplayAttachment"),
  {
    ssr: false,
  }
) as typeof StockDisplayAttachment
