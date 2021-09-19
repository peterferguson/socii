import { pnlTextColor } from "@utils/pnlTextColor"
import Link from "next/link"
import React from "react"
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

  const topPerformer = Object.keys(portfolioBreakdown).reduce((a, b) =>
    portfolioBreakdown[b]["mtd%"] > portfolioBreakdown[a]["mtd%"] ? b : a
  )
  const topPerformerPct = portfolioBreakdown[topPerformer]["mtd%"]
  const pnlColor = pnlTextColor(topPerformerPct / 100)

  return (
    <article className="flex items-center justify-between p-6 uppercase bg-white shadow-md rounded-2xl">
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
        <div className="flex flex-col justify-between ml-4">
          <div className="items-center justify-between text-tiny sm:text-sm space-y-1 sm:space-y-4">
            <Link href={`groups/${groupName}`}>
              <a className="font-semibold">{groupName}</a>
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
          {/* <div className="items-center hidden sm:flex">
            <span className="mr-2 text-xs text-gray-700">Members: </span>
            <div className="flex overflow-hidden -space-x-1">
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div> */}
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
