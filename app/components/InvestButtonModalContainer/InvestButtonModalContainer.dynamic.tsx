import dynamic from "next/dynamic"
import InvestButtonModalContainer from "./InvestButtonModalContainer"

export const InvestButtonModalContainerDynamic = dynamic(
  () =>
    import(
      "./InvestButtonModalContainer" /* webpackChunkName: "InvestButtonModalContainer" */
    ),
  { ssr: false }
) as typeof InvestButtonModalContainer
