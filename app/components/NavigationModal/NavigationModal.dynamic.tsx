import dynamic from "next/dynamic"
import NavigationModal from "./NavigationModal"

export const NavigationModalDynamic = dynamic(
  () => import("./NavigationModal" /* webpackChunkName: "NavigationModal" */),
  { ssr: false }
) as typeof NavigationModal
