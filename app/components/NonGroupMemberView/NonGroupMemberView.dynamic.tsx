import dynamic from "next/dynamic"
import NonGroupMemberView from "./NonGroupMemberView"

export const NonGroupMemberViewDynamic = dynamic(
  () =>
    import(
      "./NonGroupMemberView" /* webpackChunkName: "NonGroupMemberView" */
    ),
  { ssr: false }
) as typeof NonGroupMemberView