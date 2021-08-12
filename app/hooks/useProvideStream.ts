import { getUserStreamToken } from "@lib/firebase/client/db/getUserStreamToken"
import { isBrowser } from "@utils/isBrowser"
import { useEffect, useRef } from "react"
import { StreamChat } from "stream-chat"
import { apiKey } from "./useStream"

export const useProvideStream = (
  uid: string,
  username: string,
  displayName: string
) => {
  const streamClient = useRef<StreamChat | null>(null)

  useEffect(() => {
    streamClient.current = StreamChat.getInstance(apiKey, { timeout: 1000 })

    // TODO: Refactor the data model and have a public user_portfolio collection & private user subcollection with keys for each user
    const connectStreamUser = async () => {
      const userStreamToken = await getUserStreamToken(uid)

      if (userStreamToken && isBrowser) {
        await streamClient.current?.connectUser(
          { id: username, name: displayName },
          userStreamToken
        )
        console.log(`Connected user ${streamClient.current?.userID} to Stream!`)
      }
    }

    if (uid && username && !streamClient.current?.user) connectStreamUser()
  }, [uid, username, displayName])

  return { client: streamClient.current }
}
