import dynamic from "next/dynamic"
import OrderModal from "./OrderModal"

export const OrderModalDynamic = dynamic(
  () => import("./OrderModal" /* webpackChunkName: "OrderModal" */),
  { ssr: false }
) as typeof OrderModal
