import { getGroupMembers } from "@lib/firebase/client/db/getGroupMembers"
import { pnlTextColor } from "@utils/pnlTextColor"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import MemberPhoto from "./MemberPhoto"
import PctChangeTag from "./PctChangeTag"
import PnlArrow from "./PnlArrow"

export interface Leader {
  groupName: string
  portfolioValue: number
  portfolioBreakdown: {
    [tickerSymbol: string]: { ["portfolio%"]: number; ["mtd%"]: number }
  }[]
  "%pnl": number
  inGroup?: boolean
}

const LeaderBoardCard = ({ rank, leader }: { rank: number; leader: Leader }) => {
  const { groupName, portfolioValue, portfolioBreakdown, inGroup } = leader

  const [members, setMembers] = useState([])

  useEffect(() => {
    if (groupName) getGroupMembers(groupName).then(setMembers)
  }, [groupName])
  const topPerformer = Object.keys(portfolioBreakdown).reduce((a, b) =>
    portfolioBreakdown[b]["mtd%"] > portfolioBreakdown[a]["mtd%"] ? b : a
  )
  const topPerformerPct = portfolioBreakdown[topPerformer]["mtd%"]
  const pnlColor = pnlTextColor(topPerformerPct / 100)

  // TODO: Add tooltip on photo hover with member username
  // TODO: Fix overlapping over members photos
  return (
    <article className="flex items-center justify-between p-6  bg-white shadow-md rounded-2xl">
      <div className="flex ">
        <button
          className={`flex flex-col items-center justify-center px-4 py-2 font-semibold
         ${
           inGroup ? "bg-brand-light" : "bg-gray-50"
         } border border-gray-100 rounded sm:px-8 sm:py-4
         `}
        >
          <span role="img" aria-label="up arrow">
            {inGroup ? "⭐️" : "🔝"}
          </span>
          <span>{rank + 1}</span>
        </button>
        <div className="justify-between ml-4 grid grid-cols-flow gap-2 font-primary">
          <div className="items-center justify-between text-tiny sm:text-sm space-y-1 sm:space-y-2">
            <Link href={`groups/${groupName}`}>
              <a className="text-lg font-semibold">{groupName}</a>
            </Link>
            <h2>
              Top Performer:
              <p
                className={`flex flex-col tracking-wider uppercase font-semibold ${pnlColor} `}
              >
                <p className="flex items-center">
                  <p className="mr-1 ">{topPerformer}</p>
                  <p>
                    <PnlArrow change={topPerformerPct} />
                  </p>
                  <p className="hidden sm:inline-flex">
                    ({topPerformerPct.toFixed(2)}%)
                  </p>
                </p>
                <p className="inline-flex sm:hidden">({topPerformerPct.toFixed(2)}%)</p>
              </p>
            </h2>
          </div>
          <div className="items-center">
            <span className="mr-2 text-xs text-gray-700">Members: </span>
            <div className="flex overflow-hidden -space-x-1">
              {members.map((member) => (
                <MemberPhoto
                  username={member}
                  height="24px"
                  width="24px"
                  key={member}
                  className="inline-block ring-2 ring-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between ml-4">
        <div className="tracking-wider font-primary">
          <p className="text-center text-tiny sm:text-sm">Gain</p>
          <p className={`text-sm sm:text-base ${pnlTextColor(leader["%pnl"])}`}>
            {leader["%pnl"].toFixed(2)}%
          </p>
        </div>
      </div>
    </article>
  )
}

export default React.memo(LeaderBoardCard)
