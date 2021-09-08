import dynamic from "next/dynamic"
import IsMemberGroupView from "./IsMemberGroupView"

export const IsMemberGroupViewDynamic = dynamic(
  () =>
    import(
      "./IsMemberGroupView" /* webpackChunkName: "IsMemberGroupView" */
    ),
  { ssr: false }
) as typeof IsMemberGroupView