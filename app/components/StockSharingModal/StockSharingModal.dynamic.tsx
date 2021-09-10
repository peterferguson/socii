import dynamic from "next/dynamic"
import { default as StockSharingModal } from "./StockSharingModal"

export const StockSharingModalDynamic = dynamic(
  () => import("./StockSharingModal" /* webpackChunkName: "StockSharingModal" */),
  { ssr: false }
) as typeof StockSharingModal
