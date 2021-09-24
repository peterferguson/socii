// Repurposed from the old index in user.

import GroupColumn from "@components/GroupColumnCard"
import { PieCardSkeleton } from "@components/PieCard"
import { useAuth } from "@hooks/useAuth"
import React from "react"

const GroupPortfolios = (): JSX.Element => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col items-center justify-center w-full my-8 sm:my-0">
      <div className="w-full place-items-center grid grid-flow-row lgr:grid-flow-col gap-4 auto-cols-auto">
        {user?.groups?.length !== 0 ? (
          user?.groups?.map((groupName, index) => (
            <GroupColumn
              key={`group-${index}`}
              groupName={groupName}
              className="min-w-full"
            />
          ))
        ) : (
          <PieCardSkeleton scaling={0.3} radius={250} />
        )}
      </div>
    </div>
  )
}

export default React.memo(GroupPortfolios)
