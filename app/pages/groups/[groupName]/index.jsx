// ! Initial display of the holdings and some metrics of the performance over time

// * A pie option for groups is probably an essential ingredient.
// * This would then need to include some sort of auto-invest feature but again that is
// * part and parcel of an investment group.

// ? This maybe implemented using some sort of stripe subscription that the group can set up
// ? themselves. I.e. Each group can decide their own monthly price ... or maybe a set of prices
// ? for multiple levels of investors within the group. (This may lead to oligarchies if a unit based decision process is in place)
// ? Maybe we should have some system set-up for users to control their decision process & have various options with pros & cons

// TODOs (Page UI Features):
// - Portfolio graph & value card (with close to real-time updates?)
// - Option of comparision against leading markets (and leading groups in segment)
// - Portfolio Analysis (partnership with the likes of atom or simply wall st?)
// - Investor section with description of joining date (etc... this should not be the focus!)

import { AuthCheck, ClientOnly, GroupColumnCard } from "@components"
import { useAuth } from "@hooks/useAuth"
import { useStream } from "@hooks/useStream"
import { IsUsersGroup } from "@utils/IsUsersGroup"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
import { useMediaQuery } from "react-responsive"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

export default function Group() {
  const router = useRouter()

  const is1Col = !useMediaQuery({ minWidth: 640 })
  const { client } = useStream()
  let { groupName } = router.query

  if (Array.isArray(groupName)) groupName = groupName[0]
  return (
    <AuthCheck>
      <div className="flex">
        <div className="flex-auto pt-8">
          <div className="pb-2 text-3xl tracking-wider text-center text-gray-600 uppercase font-primary">
            holdings
          </div>
          <GroupColumnCard groupName={groupName} />
          {client && !is1Col && (
            <IsUsersGroup>
              <ClientOnly>
                <StreamChatWithNoSSR client={client} />
              </ClientOnly>
            </IsUsersGroup>
          )}
        </div>
      </div>
    </AuthCheck>
  )
}
