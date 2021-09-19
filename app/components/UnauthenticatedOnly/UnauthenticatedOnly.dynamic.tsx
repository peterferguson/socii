import dynamic from "next/dynamic"
import UnauthenticatedOnly from "./UnauthenticatedOnly"

export const UnauthenticatedOnlyDynamic = dynamic(
  () => import("./UnauthenticatedOnly" /* webpackChunkName: "UnauthenticatedOnly" */),
  { ssr: false }
) as typeof UnauthenticatedOnly
