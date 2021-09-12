import dynamic from "next/dynamic"
import NonMemberGroupView from "./NonMemberGroupView"

export const NonMemberGroupViewDynamic = dynamic(
  () =>
    import(
      "./NonMemberGroupView" /* webpackChunkName: "NonMemberGroupView" */
    ),
  { ssr: false }
) as typeof NonMemberGroupView