import dynamic from "next/dynamic"
import JoinWaitlistToast from "./JoinWaitlistToast"

export const JoinWaitlistToastDynamic = dynamic(
  () => import("./JoinWaitlistToast" /* webpackChunkName: "JoinWaitlistToast" */),
  { ssr: false }
) as typeof JoinWaitlistToast
