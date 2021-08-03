// TODOs (Page Features):
// - Display the pie charts of each of the groups the user is part of but solely for their share
// // - Create pie charts & skeleton loaders for those charts
// - Create conversion function for the group holdings data into pie format
// - Create conversion function for the group trade data into long form cards
// ? - Create conversion function for the group trade data into an activity feed
// - Get doc in one go - remove for each - see IMPROVE
// -

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
    <>
      {userGroups?.length !== 0 ? (
        userGroups?.map((groupName, index) => (
          <GroupColumn
            key={`group-${index}`}
            groupName={groupName}
            className="w-full sm:w-1/2 xl:w-1/3"
          />
        ))
      ) : (
        <PortfolioSkeletons />
      )}
    </>
  )
}

export default function UserPage() {
  const router = useRouter()
  const { username: pagename } = router.query

  return (
    <AuthCheck>
      <div className="flex flex-wrap justify-center">
        {!pagename ? <PortfolioSkeletons /> : <GroupPortfolios pagename={pagename} />}
      </div>
    </AuthCheck>
  )
}
