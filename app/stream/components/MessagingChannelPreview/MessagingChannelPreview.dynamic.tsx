import dynamic from "next/dynamic"
import MessagingChannelPreview from "./MessagingChannelPreview"

export const MessagingChannelPreviewDynamic = dynamic(
  () => import("./MessagingChannelPreview"),
  { ssr: false }
) as typeof MessagingChannelPreview
