// - Repurposed this into component for displaying all groups - GroupPortfolios
// - Maybe convert this page into a public/private page if we want the ability to search
//    for specific users
//
// did not delete since i think userCreation may still route to here
//
// TODOs (Page Features):
// ? - Create conversion function for the group trade data into an activity feed
// - Get doc in one go - remove for each - see IMPROVE

import AuthCheck from "@components/AuthCheck"
import GroupColumn from "@components/GroupColumnCard"
import { PieCardSkeleton } from "@components/PieCard"
import { useAuth } from "@hooks/useAuth"
import { useRouter } from "next/router"
import React from "react"

const PortfolioSkeletons = () => (
  <>
    {[1, 2, 3].map((i) => (
      <PieCardSkeleton key={`skeleton-${i}`} scaling={0.3} radius={250} />
    ))}
  </>
)

function GroupPortfolios({ pagename }): JSX.Element {
  const { userGroups } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center w-full my-14 sm:my-0">
      <div className="mx-auto mb-4 text-3xl font-primary text-brand-shade-darkest">
        Group Portfolios
      </div>
      <div className="place-items-center grid grid-flow-row sm:grid-flow-col gap-4 auto-cols-auto max-w-screen-thin">
        {userGroups?.length !== 0 ? (
          userGroups?.map((groupName, index) => (
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

export default function UserPage() {
  const router = useRouter()
  const { username: pagename } = router.query

  return (
    <AuthCheck>
      {!pagename ? <PortfolioSkeletons /> : <GroupPortfolios pagename={pagename} />}
    </AuthCheck>
  )
}
