import dynamic from "next/dynamic"
import CustomTriggerProvider from "./CustomTriggerProvider"

export const CustomTriggerProviderDynamic = dynamic(
  () => import("./CustomTriggerProvider"),
  { ssr: false }
) as typeof CustomTriggerProvider
