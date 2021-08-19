import dynamic from "next/dynamic"
import React, { useRef } from "react"
import { MessagingChannelListDynamic, MessagingChannelPreviewDynamic } from "."
import { useClickAway } from "react-use"
import { send } from "xstate/lib/actionTypes"

const StreamChannelList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.ChannelList) as any,
  { ssr: false }
) as any

const ChannelList = ({
  userID,
  onCreateChannel,
  groupName,
  send,
  toggleChannelList,
}) => {
  const ref = useRef(null)
  const filter = { members: { $in: [userID] } }
  const options = { state: true, watch: true, presence: true, limit: 5 }
  const sort = { last_message_at: -1, updated_at: -1, cid: 1 }

  useClickAway(ref, () => send("TOGGLE"), ["mousedown", "touchstart"])

  return (
    <div
      className={`mx-4 transition duration-600 ease-in-out z-50 no-scrollbar`}
      ref={ref}
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
