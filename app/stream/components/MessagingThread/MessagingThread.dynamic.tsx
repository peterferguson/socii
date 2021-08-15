import dynamic from "next/dynamic"
import MessagingThread from "./MessagingThread"

export const MessagingThreadDynamic = dynamic(() => import("./MessagingThread"), {
  ssr: false,
}) as typeof MessagingThread
