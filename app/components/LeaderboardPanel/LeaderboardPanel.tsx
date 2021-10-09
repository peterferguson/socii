import LeaderBoardCard from "@components/LeaderBoardCard"
import { useAuth } from "@hooks"
import React from "react"

const LeaderboardPanel = ({ leaders }) => {
  const { user } = useAuth()
  const userGroups = user && user.groups ? user.groups : []

  return (
    <section className="flex flex-col justify-between ">
      <div className="max-w-4xl mx-4 mt-12 sm:mt-20 md:mx-auto space-y-4">
        <h1 className="mb-8 text-3xl font-semibold tracking-wide uppercase font-primary">
          Leaderboard
        </h1>
        <span className="text-sm font-primary">
          The leaderboard is a list of the top performing groups on socii.
          <br />
          <br />
          <p>How does your group compare against other sociians?</p>
          <br />
          <br />
        </span>
        {leaders?.map((leader, rank) => (
          <LeaderBoardCard
            key={`leader-${rank}-${leader.groupName}`}
            rank={rank}
            leader={
              userGroups.includes(leader.groupName)
                ? { inGroup: true, ...leader }
                : leader
            }
          />
        ))}
        <p className="mt-8 font-primary text-tiny">
          All gains shown reflect the month to date performance of each group. Only
          public groups are displayed
        </p>
      </div>
    </section>
  )
}

export default LeaderboardPanel
