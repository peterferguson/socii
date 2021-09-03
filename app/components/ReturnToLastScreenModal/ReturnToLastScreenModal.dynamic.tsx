import dynamic from "next/dynamic"
import ReturnToLastScreenModal from "./ReturnToLastScreenModal"

export const ReturnToLastScreenModalDynamic = dynamic(
  () =>
    import(
      "./ReturnToLastScreenModal" /* webpackChunkName: "ReturnToLastScreenModal" */
    ),
  { ssr: false }
) as typeof ReturnToLastScreenModal
