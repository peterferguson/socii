import dynamic from "next/dynamic"
import MessagingThread from "./MessagingThreadHeader"

export const MessagingThreadDynamic = dynamic(() => import("./MessagingThreadHeader"), {
  ssr: false,
}) as typeof MessagingThread
