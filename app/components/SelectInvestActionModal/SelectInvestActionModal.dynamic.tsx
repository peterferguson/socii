import dynamic from "next/dynamic"
import SelectInvestActionModal from "./SelectInvestActionModal"

export const SelectInvestActionModalDynamic = dynamic(
  () =>
    import(
      "./SelectInvestActionModal" /* webpackChunkName: "SelectInvestActionModal" */
    ),
  { ssr: false }
) as typeof SelectInvestActionModal
