// TODO:
// potentially add all the surrounding tab context to the page.... would this cause issues for certain non users?

import { GroupPortfolios } from "@components/GroupPortfolios"
import React, { useMemo } from "react"

const MyGroups = () => {

  const groupsCards:JSX.Element = useMemo(() => 
    <GroupPortfolios/>
  ,[])
  
  return (
    <div>
      {groupsCards}
    </div> 
  )
}
export default MyGroups
