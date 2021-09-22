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

import { AuthCheck } from "@components/AuthCheck"
import { IsUsersGroup } from "@utils/IsUsersGroup"
import { useRouter } from "next/router"
import React from "react"
import { NonMemberGroupViewDynamic } from "@components/NonMemberGroupView/index"
import { IsMemberGroupViewDynamic } from "@components/IsMemberGroupView/index"
import { updateTradeEvents } from "@utils/updateTradeEvents"
import { getLeaderBoardProps } from "@utils/getLeaderBoardProps"

export default function Group() {
  const router = useRouter()
  let { groupName } = router.query
  let isMember = IsUsersGroup()

  if (Array.isArray(groupName)) groupName = groupName.pop()
  return (
    <AuthCheck>
      {isMember ? (
        <IsMemberGroupViewDynamic groupName={groupName} />
      ) : (
        <NonMemberGroupViewDynamic groupName={groupName} />
      )}
    </AuthCheck>
  )
}

// - For now simply update the trade events on every page load from the server-side
export const getStaticProps = async () => {
  updateTradeEvents()
  return { props: {} }
}

export async function getStaticPaths() {
  const {
    props: { leaders },
  } = await getLeaderBoardProps()
  const paths = leaders.map((leader) => ({ params: { groupName: leader.groupName } }))
  return { paths, fallback: true }
}
