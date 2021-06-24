// TODOs (Page Features):
// - Display the pie charts of each of the groups the user is part of but solely for their share
// // - Create pie charts & skeleton loaders for those charts
// - Create conversion function for the group holdings data into pie format
// - Create conversion function for the group trade data into long form cards
// ? - Create conversion function for the group trade data into an activity feed
// -
// -


import GroupColumn from "@components/GroupCharts"
import { PieCardSkeleton } from "@components/PieCard"
import UserPhoto from "@components/UserPhoto"
import { UserContext } from "@lib/context"
import { getRandomTailwindColor } from "@utils/helper"
import { auth } from "@lib/firebase"
import { useRouter } from "next/router"
import React, { useContext } from "react"

export default function UserPage() {
  const router = useRouter()
  const pagename = router.query.username
  const { username, userGroups } = useContext(UserContext)

  const isUsersHomepage = pagename === username

  return (
    <main>
      <div className="flex flex-row w-full">
        <UserPhoto
          username={pagename}
          photoURL={isUsersHomepage ? auth.currentUser?.photoURL || "" : ""}
        />
        <div className="p-4 text-xl font-poppins text-brand-light">{pagename}</div>
      </div>
      <div className={`flex items-center justify-center m-8 mx-auto text-5xl font-poppins text-${getRandomTailwindColor()}`}>
        Groups
      </div>
      <div className="flex flex-wrap justify-center">
        {(!auth.currentUser || !userGroups) &&
          [1, 2, 3].map((i) => (
            <PieCardSkeleton key={`skeleton-${i}`} scaling={0.3} radius={250} />
          ))}
        {username == pagename &&
          userGroups?.map((groupName, index) => {
            return <GroupColumn key={`group-${index}`} groupName={groupName} />
          })}
      </div>
    </main>
  )
}
