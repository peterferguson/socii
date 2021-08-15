import { useAuth } from "@hooks"
import { isBrowser } from "@utils/isBrowser"
import { useEffect, useRef } from "react"
import { StreamChat } from "stream-chat"

export const useStreamClient = () => {
  const { user, username } = useAuth()
  const streamClient = useRef<StreamChat | null>(null)

  useEffect(() => {
    streamClient.current = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      { timeout: 1000 }
    )

    // TODO: Refactor the data model and have a public user_portfolio collection & private user subcollection with keys for each user
    const connectStreamUser = async () => {
      if (user?.streamToken && isBrowser) {
        await streamClient.current?.connectUser(
          { id: username, name: user.displayName },
          user.streamToken
        )
        console.log(`Connected user ${streamClient.current?.userID} to Stream!`)
      }
    }

    if (user?.uid && username && !streamClient.current?.user) connectStreamUser()
  }, [user?.displayName, user?.streamToken, user?.uid, username])

  return { client: streamClient.current }
}
