import dynamic from "next/dynamic"
import { default as InformationModal } from "./InformationModal"

export const InformationModalDynamic = dynamic(
  () => import("./InformationModal" /* webpackChunkName: "InformationModal" */),
  { ssr: false }
) as typeof InformationModal
