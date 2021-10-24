import { useAuth } from "../hooks/useAuth"
import React, { useEffect, useRef } from "react"
import { StreamChat } from "stream-chat"
import Constants from "expo-constants"

const streamApiKey = Constants.manifest.extra.stream.key

export interface StreamClientContext {
  client: StreamChat
}

export const useStreamClient = (): StreamClientContext => {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const streamClient = useRef<StreamChat | null>(null)

  useEffect(() => {
    streamClient.current = StreamChat.getInstance(streamApiKey)

    // TODO: Refactor the data model and have a public user_portfolio collection & private user subcollection with keys for each user
    const connectStreamUser = async () => {
      if (user?.streamToken && process.env.NODE_ENV === "development") {
        console.log(`Connecting to 'development' stream for user ${user.uid}`)
        await streamClient.current?.connectUser(
          { id: username, name: user.displayName },
          user.streamToken
        )
        console.log(
          `Connected user ${streamClient.current?.userID} to 'development' Stream!`
        )
      } else {
        console.log(`Connecting to stream for user ${user.uid}`)
        await streamClient.current?.connectUser(
          { id: username, name: user.displayName },
          async () => {
            const response = await fetch("/api/stream/generateToken", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
              },
              body: JSON.stringify({ userId: username }),
            })
            return (await response.json())?.token
          }
        )
        console.log(`Connected user ${streamClient.current?.userID} to Stream`)
        // streamClient.current.user.
        // console.log(`Adding user ${streamClient.current?.userID} to sociians`)
      }
    }

    if (user?.uid && username && !streamClient.current?.user) connectStreamUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  return { client: streamClient.current }
}
