import { useAuth } from "../hooks/useAuth"
import React, { useEffect, useRef } from "react"
import { StreamChat } from "stream-chat"
import type { StreamChat as Stream } from "stream-chat"
import Constants from "expo-constants"

const streamApiKey = Constants.manifest.extra.stream.key
const DEVELOPMENT = Constants.manifest.extra.STAGE === "development"

export interface StreamClientContext {
  client: Stream
}

export const useStreamClient = (): StreamClientContext => {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const streamClient = useRef<StreamChat | null>(null)
  const [streamToken, setStreamToken] = React.useState<string>("")

  useEffect(() => {
    const generateToken = async () => {
      const response = await fetch("/api/stream/generateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({ userId: username }),
      })
      return (await response.json())?.token as string
    }

    DEVELOPMENT
      ? setStreamToken(user?.streamToken)
      : generateToken().then((token) => setStreamToken(token))
  }, [username, user?.streamToken])

  useEffect(() => {
    streamClient.current = StreamChat.getInstance(streamApiKey)

    // TODO: Refactor the data model and have a public user_portfolio collection & private user subcollection with keys for each user
    const connectStreamUser = async () => {
      console.log("Connecting user to Stream", user?.streamToken)
      console.log("Connecting user to Stream", DEVELOPMENT)
      console.log(`Connecting to stream for user ${user.uid}`)

      await streamClient.current?.connectUser(
        { id: username, name: user.displayName },
        streamToken
      )
      console.log(`Connected user ${streamClient.current?.userID} to Stream`)
    }

    if (user?.uid && username && !streamClient.current?.user) connectStreamUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, streamClient.current, streamToken])

  return { client: streamClient.current }
}
