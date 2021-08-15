import dynamic from "next/dynamic"
import CreateChatModal from "./CreateChatModal"

export const CreateChatModalDynamic = dynamic(
  () => import("..").then((mod) => mod.CreateChatModal),
  {
    ssr: false,
  }
) as typeof CreateChatModal
