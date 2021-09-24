import dynamic from "next/dynamic"
import IsGroupMemberView from "./IsGroupMemberView"

export const IsGroupMemberViewDynamic = dynamic(
  () =>
    import(
      "./IsGroupMemberView" /* webpackChunkName: "IsGroupMemberView" */
    ),
  { ssr: false }
) as typeof IsGroupMemberView