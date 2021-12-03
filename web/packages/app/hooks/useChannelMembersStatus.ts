import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream/types"
import { useEffect, useState } from "react"
import type { Channel } from "stream-chat"
import { useStream } from "."
import { getUserActivityStatus } from "../utils/getUserActivityStatus"

export const useChannelMembersStatus = (
  channel: Channel<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >
) => {
  const watchersCount = channel.state.watcher_count
  const memberCount = channel?.data?.member_count

  const getStatus = () => {
    let newStatus = ""
    const isOneOnOneConversation =
      memberCount === 2 && channel.id?.indexOf("!members-") === 0

    if (isOneOnOneConversation) {
      const result = Object.values({ ...channel.state.members }).find(
        member => member.user?.id !== client?.user?.id
      )

      return (newStatus = getUserActivityStatus(result?.user))
    } else {
      const memberCountText = `${memberCount} Members`
      const onlineCountText = watchersCount > 0 ? `${watchersCount} Online` : ""

      newStatus = `${[memberCountText, onlineCountText].join(",")}`

      return newStatus
    }
  }

  const [status, setStatus] = useState(getStatus())
  const { client } = useStream()

  useEffect(() => {
    setStatus(getStatus())
  }, [watchersCount, memberCount, client])

  return status
}
