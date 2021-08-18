import { useAuth } from "@hooks"
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
      console.log(`Connecting to stream for user ${user.uid}`)
      
      if (user?.streamToken && process.env.NODE_ENV === "development") {
        await streamClient.current?.connectUser(
          { id: username, name: user.displayName },
          user.streamToken
        )
      }

      if (process.env.NODE_ENV === "production") {
        await streamClient.current?.connectUser(
          { id: username, name: user.displayName },
          async () => {
            const response = await fetch("/api/stream/generateToken", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
              },
              body: JSON.stringify({
                userId: username,
              }),
            })
            return response.json()?.token
          }
        )
      }

      console.log(`Connected user ${streamClient.current?.userID} to Stream!`)
    }

    if (user?.uid && username && !streamClient.current?.user) connectStreamUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.streamToken])

  return { client: streamClient.current }
}
