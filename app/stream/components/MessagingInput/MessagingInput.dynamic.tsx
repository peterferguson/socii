import dynamic from "next/dynamic"
import MessagingInput from "./MessagingInput"

export const MessagingInputDynamic = dynamic(() => import("./MessagingInput"), {
  ssr: false,
}) as typeof MessagingInput
