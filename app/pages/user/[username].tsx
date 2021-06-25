// TODOs (Page Features):
// - Display the pie charts of each of the groups the user is part of but solely for their share
// // - Create pie charts & skeleton loaders for those charts
// - Create conversion function for the group holdings data into pie format
// - Create conversion function for the group trade data into long form cards
// ? - Create conversion function for the group trade data into an activity feed
// - Get doc in one go - remove for each - see IMPROVE
// -

import GroupColumn from "@components/GroupCharts"
import AuthCheck from "@components/AuthCheck"
import { PieCardSkeleton } from "@components/PieCard"
import UserPhoto from "@components/UserPhoto"
import { UserContext } from "@lib/context"
import { auth, firestore } from "@lib/firebase"
import { getRandomTailwindColor } from "@utils/helper"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"

const PortfolioSkeletons = () => (
  <>
    {[1, 2, 3].map((i) => (
      <PieCardSkeleton key={`skeleton-${i}`} scaling={0.3} radius={250} />
    ))}
  </>
)

function GroupPortfolios({ pagename }): JSX.Element {
  const groupsQuery = firestore
    .collection("users")
    .where("username", "==", pagename)
    .limit(1)

  const [values, loading, error] = useCollectionDataOnce(groupsQuery)

  const groups = values?.[0]?.groups
  return (
    <>
      {!(loading || error) ? (
        groups?.map((groupName, index) => {
          return <GroupColumn key={`group-${index}`} groupName={groupName} />
        })
      ) : (
        <PortfolioSkeletons />
      )}
    </>
  )
}

export default function UserPage() {
  const router = useRouter()
  const pagename = router.query.username
  const { username } = useContext(UserContext)

  const isUsersHomepage = pagename === username

  return (
    <AuthCheck>
      <main>
        <div className="flex flex-row w-full">
          <UserPhoto
            username={typeof pagename === "string" ? pagename : pagename?.[0]}
            photoURL={isUsersHomepage ? auth.currentUser?.photoURL || "" : ""}
          />
          <div className="p-4 text-xl font-poppins text-brand-light">{pagename}</div>
        </div>
        <div
          className={`flex items-center justify-center m-8 mx-auto text-5xl font-poppins text-${getRandomTailwindColor()}`}
        >
          Groups
        </div>
        <div className="flex flex-wrap justify-center">
          {!pagename ? <PortfolioSkeletons /> : <GroupPortfolios pagename={pagename} />}
        </div>
      </main>
    </AuthCheck>
  )
}
