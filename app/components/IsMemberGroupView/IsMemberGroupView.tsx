// TODO
// - Implement proper view
// - enable stream

import { AuthCheck, ClientOnly, GroupColumnCard } from "@components"
import { useAuth } from "@hooks/useAuth"
import { useStream } from "@hooks/useStream"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
import { useMediaQuery } from "react-responsive"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

const IsMemberGroupView = () => {

  const router = useRouter()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  //const { client } = useStream()
  let { groupName } = router.query

  if (Array.isArray(groupName)) groupName = groupName[0]

  return(
    <AuthCheck>
      <div className="flex items-center justify-center">
        <div className="flex-auto pt-8">
          <div className="pb-2 text-3xl tracking-wider text-center text-gray-600 uppercase font-primary">
            holdings
          </div>
          <GroupColumnCard groupName={groupName} />
          { !is1Col && (
              <ClientOnly>
                {/* <StreamChatWithNoSSR client={client} /> */}
                <div>test</div>
              </ClientOnly>
          )}
        </div>
      </div>
    </AuthCheck>
  )
}

export default IsMemberGroupView