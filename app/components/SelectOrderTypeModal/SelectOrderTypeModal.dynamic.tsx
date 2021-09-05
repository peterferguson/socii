import dynamic from "next/dynamic"
import SelectOrderTypeModal from "./SelectOrderTypeModal"

export const SelectOrderTypeModalDynamic = dynamic(
  () => import("./SelectOrderTypeModal" /* webpackChunkName: "SelectOrderTypeModal" */),
  { ssr: false }
) as typeof SelectOrderTypeModal
