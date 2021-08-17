import React from "react"

export interface Leader {
  groupName: string
  portfolioValue: number
  portfolioBreakdown: { [tickerSymbol: string]: number }[]
  "%pnl": number
}

export const LeaderBoardCard = ({ rank, leader }: { rank: number; leader: Leader }) => (
  <article className="flex items-center justify-between p-6 uppercase bg-white shadow-md rounded-2xl">
    <div className="flex">
      <button className="flex flex-col px-8 py-4 font-bold bg-gray-100 border border-gray-300 rounded">
        <span role="img" aria-label="up arrow">
          🔝
        </span>
        <span>{rank + 1}</span>
      </button>
      <div className="flex flex-col justify-between ml-4">
        <div className="mb-4">
          <p className="text-sm font-bold">{leader.groupName}</p>
          <p>City</p>
        </div>
        <div className="flex items-center">
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
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-between ml-4">
      <div className="mb-4 tracking-wider font-primary">
        <p className="text-teal-400">{leader["%pnl"].toFixed(2)}%</p>
        <p className="text-sm">% Gain Pos</p>
      </div>
    </div>
  </article>
)
