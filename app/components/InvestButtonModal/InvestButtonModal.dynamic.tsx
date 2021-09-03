import dynamic from "next/dynamic"
import InvestButtonModal from "./InvestButtonModal"

export const InvestButtonModalDynamic = dynamic(
  () => import("./InvestButtonModal" /* webpackChunkName: "InvestButtonModal" */),
  { ssr: false }
) as typeof InvestButtonModal
