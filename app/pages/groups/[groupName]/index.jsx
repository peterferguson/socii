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
// -

// TODOs (Backend Features):
// - Firestore collection for groups with subcollections for investors, holdings, ...
// - Real-time db / api calls to update the graph & price card:
// ? Maybe this should be cached & then use the realtime db to store previous pricing data
// ? This would get expensive over time so maybe forget about realtime db and use api calls
// ? to update firestore price & create a collection to store this for each ticker.
// ? Historical data can be valuable when exposed via an api. Plus this could allow us to create
// ? an interface with our users for historical modelling etc for the more tech savvy users.
// ? Simple modelling could be made available for all users, in the sense of simulations of
// ? removing certain trades & replacing them with alternatives. This could allow users to
// ? easily reevaluate their investment thesis in a retrospective manner.
// ! Implementing storage of this data would also save us money in the future since we
// ! would not need to call an api to get this data for historical pricing in simulations
// - Sunburst charts for allocation, diversifaction & over allocation.

import LoadingIndicator from '@components/LoadingIndicator'
import AuthCheck from '@components/AuthCheck'
import ClientOnly from '@components/ClientOnly'
import Custom404 from '../../404'
import { UserContext } from '@lib/context'

import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const StreamChatWithNoSSR = dynamic(
  () => import('@components/stream/Chat'),
  { ssr: false }
)


export default function Group() {
  const router = useRouter()
  const { groupName } = router.query
  const { userGroups, streamClient } = useContext(UserContext)

  if (groupName && !userGroups.includes(groupName)) {
    return <Custom404 />
  }

  if (!streamClient.user) {
    // TODO: Use skeleton loaders for chat
    return <LoadingIndicator />
  }

  return (
    <div className="flex">
      <div className="w-1/3">{groupName}</div>
      <div className="w-2/3">
        <AuthCheck>
          <ClientOnly>
            <StreamChatWithNoSSR groupName={groupName} />
          </ClientOnly>
        </AuthCheck>
      </div>
    </div>
  )
}
