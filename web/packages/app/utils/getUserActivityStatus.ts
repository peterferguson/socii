import Dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { UserType } from "../models/stream/types"

import type { Immutable } from "seamless-immutable"
import type { UserResponse } from "stream-chat"

Dayjs.extend(relativeTime)

export const getUserActivityStatus = (
  user?: Immutable<UserResponse<UserType>> | UserResponse<UserType>
) => {
  if (!user) return ""
  if (user.online) return "Online"
  if (Dayjs(user.last_active).isBefore(Dayjs()))
    return `Last seen ${Dayjs(user?.last_active).fromNow()}`
  return ""
}
