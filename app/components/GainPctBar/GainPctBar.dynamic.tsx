import dynamic from "next/dynamic"
import GainPctBar from "./GainPctBar"

export const GainPctBarDynamic = dynamic(
  () => import("./GainPctBar" /* webpackChunkName: "GainPctBar" */),
  { ssr: false }
) as typeof GainPctBar
