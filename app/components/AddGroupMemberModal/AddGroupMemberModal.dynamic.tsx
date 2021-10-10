import dynamic from "next/dynamic"
import AddGroupMemberModal from "./AddGroupMemberModal"

export const AddGroupMemberModalDynamic = dynamic(
  () =>
    import(
      "./AddGroupMemberModal" /* webpackChunkName: "AddGroupMemberModal" */
    ),
  { ssr: false }
) as typeof AddGroupMemberModal