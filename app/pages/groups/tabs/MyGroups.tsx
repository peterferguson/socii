// TODO:
// potentially add all the surrounding tab context to the page.... would this cause issues for certain non users?

import React , { useMemo } from "react"
import { useAuth } from "@hooks"
import { GroupPortfolios } from "@components/GroupPortfolios"
import { useRouter } from "next/router"

const MyGroups = () => {
  const { userGroups } = useAuth()
  const router = useRouter()

  const groupsCards:JSX.Element = useMemo(() => 
    MyComp(userGroups)
  ,[userGroups])
  
  return (
    <div>
      {groupsCards}
    </div> 
  )
}
export default MyGroups

export const MyComp = (userGroups: string[]) => (
  <GroupPortfolios userGroupsList= {userGroups}/>
)

// // TODO fix paths
// export async function getStaticPaths() {
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }

