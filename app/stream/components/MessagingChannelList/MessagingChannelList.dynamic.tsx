import dynamic from "next/dynamic"
import MessagingChannelList from "./MessagingChannelList"

export const MessagingChannelListDynamic = dynamic(
  () => import("./MessagingChannelList"),
  { ssr: false }
) as typeof MessagingChannelList
