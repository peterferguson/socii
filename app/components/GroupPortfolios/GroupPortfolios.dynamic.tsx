import dynamic from "next/dynamic"
import GroupPortfolios from "./GroupPortfolios"

export const GroupPortfoliosDynamic = dynamic(
  () => import("./GroupPortfolios" /* webpackChunkName: "GroupPortfolios" */),
  { ssr: false }
) as typeof GroupPortfolios
