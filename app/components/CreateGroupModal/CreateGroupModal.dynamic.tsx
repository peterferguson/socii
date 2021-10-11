import dynamic from "next/dynamic"
import CreateGroupModal from "./CreateGroupModal"

export const CreateGroupModalDynamic = dynamic(
  () =>
    import(
      "./CreateGroupModal" /* webpackChunkName: "CreateGroupModal" */
    ),
  { ssr: false }
) as typeof CreateGroupModal