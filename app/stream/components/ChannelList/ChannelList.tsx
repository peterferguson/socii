import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import { MessagingChannelListDynamic, MessagingChannelPreviewDynamic } from ".."

const StreamChannelList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.ChannelList) as any,
  { ssr: false }
) as any

const ChannelList = ({
  userID,
  onCreateChannel,
  showChannelList,
  toggleChannelList,
}) => {
  const ref = useRef(null)
  const filter = { members: { $in: [userID] } }
  const options = { state: true, watch: true, presence: true, limit: 5 }
  const sort = { last_message_at: -1, updated_at: -1, cid: 1 }
  const router = useRouter()
  let { cid } = router.query
  cid = Array.isArray(cid) ? cid.pop() : cid

  useEffect(() => {
    const mobileChannelList = document.querySelector("#mobile-channel-list")
    const mobileFooter = document.querySelector("#mobile-footer")
    if (showChannelList && mobileChannelList) {
      mobileChannelList.classList.add("show")
      mobileFooter.classList.add("show")
      document.body.style.overflow = "hidden"
    } else if (!showChannelList && mobileChannelList) {
      mobileChannelList.classList.remove("show")
      mobileFooter.classList.remove("show")
      document.body.style.overflow = "auto"
    }
  }, [showChannelList])

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div id="mobile-channel-list" ref={ref} onClick={toggleChannelList}>
      <StreamChannelList
        filters={filter}
        sort={sort}
        options={options}
        customActiveChannel={`groups:${cid?.replace(/\s/g, "-")}` || ""}
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
