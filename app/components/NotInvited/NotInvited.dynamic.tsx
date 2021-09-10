import dynamic from "next/dynamic"
import NotInvited from "./NotInvited"

export const NotInvitedDynamic = dynamic(
  () => import("./NotInvited" /* webpackChunkName: "NotInvited" */),
  { ssr: false }
) as typeof NotInvited
