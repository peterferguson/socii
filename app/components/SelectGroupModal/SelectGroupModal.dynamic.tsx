import dynamic from "next/dynamic"
import SelectGroupModal from "./SelectGroupModal"

export const SelectGroupModalDynamic = dynamic(
  () => import("./SelectGroupModal" /* webpackChunkName: "SelectGroupModal" */),
  { ssr: false }
) as typeof SelectGroupModal
