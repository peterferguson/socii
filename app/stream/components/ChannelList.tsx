import dynamic from "next/dynamic"
import React from "react"
import { MessagingChannelListDynamic, MessagingChannelPreviewDynamic } from "."

const StreamChannelList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.ChannelList) as any,
  { ssr: false }
) as any

const ChannelList = ({
  userID,
  onCreateChannel,
  groupName,
  state,
  toggleChannelList,
}) => {
  const filter = { members: { $in: [userID] } }
  const options = { state: true, watch: true, presence: true, limit: 5 }
  const sort = { last_message_at: -1, updated_at: -1, cid: 1 }

  return (
    <div
      className={`mx-4 transition duration-600 ease-in-out z-50
        ${
          state.value === "closed"
            ? "transform translate-x-full"
            : "transform translate-x-0"
        }
        `}
    >
      <StreamChannelList
        filters={filter}
        sort={sort}
        options={options}
        showChannelSearch={true}
        customActiveChannel={groupName?.replace(/\s/g, "-") || ""}
        List={(props) => (
          <MessagingChannelListDynamic {...props} onCreateChannel={onCreateChannel} />
        )}
        Preview={(props) => (
          <MessagingChannelPreviewDynamic
            {...props}
            toggleChannelList={toggleChannelList}
          />
        )}
      />
    </div>
  )
}

export default ChannelList
