import dynamic from "next/dynamic"
import LeaderboardPanel from "./LeaderboardPanel"

export const LeaderboardPanelDynamic = dynamic(
  () => import("./LeaderboardPanel" /* webpackChunkName: "LeaderboardPanel" */),
  { ssr: false }
) as typeof LeaderboardPanel
