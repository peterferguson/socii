import dynamic from "next/dynamic"
import CustomAttachment from "./CustomAttachment"

export const CustomAttachmentDynamic = dynamic(() => import("./CustomAttachment"), {
  ssr: false,
}) as typeof CustomAttachment
