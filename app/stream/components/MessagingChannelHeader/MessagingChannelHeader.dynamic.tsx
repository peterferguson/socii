import dynamic from "next/dynamic"
import MessagingChannelHeader from "./MessagingChannelHeader"

export const MessagingChannelHeaderDynamic = dynamic(
  () => import("./MessagingChannelHeader"),
  { ssr: false }
) as typeof MessagingChannelHeader
