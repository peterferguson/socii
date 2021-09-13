// TODO:
// - speed up render. attempted usememo but still takes time
// - Potential:
//   - add "followed groups" page to check status of other open groups

import React , { Fragment , useState , useMemo , useEffect} from "react"
import { LeaderboardPanel } from "@components/LeaderboardPanel"
import { useAuth } from "@hooks"
import { AuthCheck } from "@components"
import { Tab } from '@headlessui/react'
import { TabHeading } from "@components/TabHeading"
import { TabPanels } from "@components/TabPanels"
import { GroupPortfolios } from "@components/GroupPortfolios"
import { getLeaderBoardProps } from "../../utils/getLeaderBoardProps"
import ComingSoon from "@components/ComingSoon"
import { FaUserInjured } from "react-icons/fa"

const GroupsHome = ({ leaders }) => {
  const { userGroups } = useAuth()
  const [selected , setSelected] = useState("My Groups")
  let [categories, setCategories] = useState({
    "My Groups": [],
    Leaderboards: [],
    "Other Groups": [],
  })

  const groupsCards:JSX.Element = useMemo(() => 
    MyComp(userGroups)
  ,[userGroups])
  
  return (
  <AuthCheck>
    <Tab.Group onChange={(index) => setSelected(Object.keys(categories)[index])}>
      <div className = "container flex flex-col center" > 
        <div className="flex flex-row justify-center bg-white rounded-lg shadow-lg font-primary text-l">
        <TabHeading categories={categories} />
        </div>
        <TabPanels categories={categories}>
      
          <div className = { (selected ==="My Groups") ? "" : "hidden" }>
            {groupsCards}
          </div>
          <div className = { (selected ==="Leaderboards") ? "" : "hidden" }>
            <LeaderboardPanel leaders = {leaders}/>
          </div>
          <div className = { (selected ==="Other Groups") ? "" : "hidden" }>
            <ComingSoon color="brand-pink" description="">
              <FaUserInjured className={`w-24 h-24 text-brand-pink`} />
            </ComingSoon>
          </div>

        </TabPanels>
      </div>
    </Tab.Group>
  </AuthCheck>
  )
}
export default GroupsHome

export const getStaticProps = async () => await getLeaderBoardProps()

export const MyComp = (userGroups: string[]) => (
  <GroupPortfolios userGroupsList= {userGroups}/>
)



