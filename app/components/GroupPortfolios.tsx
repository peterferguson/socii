// Repurposed from the old index in user. 

import GroupColumn from "@components/GroupColumnCard"
import { PieCardSkeleton } from "@components/PieCard"
import React from "react"

const PortfolioSkeletons = () => (
  <>
    {[1, 2, 3].map((i) => (
      <PieCardSkeleton key={`skeleton-${i}`} scaling={0.3} radius={250} />
    ))}
  </>
)

export function GroupPortfolios({ userGroupsList }): JSX.Element {

  return (
    <div className="flex flex-col items-center justify-center w-full my-14 sm:my-0">
      <div className="place-items-center grid grid-flow-row sm:grid-flow-col gap-4 auto-cols-auto max-w-screen-thin">
        {userGroupsList?.length !== 0 ? (
          userGroupsList?.map((groupName, index) => (
            <GroupColumn
              key={`group-${index}`}
              groupName={groupName}
              className="w-11/12 sm:w-2/3"
            />
          ))
        ) : (
          <PortfolioSkeletons />
        )}
      </div>
    </div>
  )
}
