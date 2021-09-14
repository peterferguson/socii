import dynamic from "next/dynamic"
import WelcomeSplash from "./WelcomeSplash"

export const WelcomeSplashDynamic = dynamic(
  () => import("./WelcomeSplash" /* webpackChunkName: "WelcomeSplash" */),
  { ssr: false }
) as typeof WelcomeSplash
