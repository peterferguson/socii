import { useState, useEffect } from "react"
import { Channel } from "app/models/stream/types"
import { useStream } from "./useStream"

export const useGroupChatChannel = (groupName: string) => {
  const { client } = useStream()
  const [channel, setChannel] = useState<Channel>()

  useEffect(
    () =>
      client?.user &&
      setChannel(
        client.channel("group", groupName.replace(/\s/g, "-"), {
          watch: false,
          state: true,
        })
      ),
    [client?.user, groupName]
  )

  return channel
}
