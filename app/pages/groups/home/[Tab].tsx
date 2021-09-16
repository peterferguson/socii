// TODO:
// Fortmat code
// dynamic imports
// potentially add all the surrounding tab context to the page.... would this cause issues for certain non users?

import React , { Fragment , useState , useMemo , useEffect} from "react"
import { LeaderboardPanel } from "@components/LeaderboardPanel"
import { useAuth } from "@hooks"
import { AuthCheck } from "@components"
import { GroupPortfolios } from "@components/GroupPortfolios"
import { getLeaderBoardProps } from "@utils/getLeaderBoardProps"
import ComingSoon from "@components/ComingSoon"
import { FaUserInjured } from "react-icons/fa"
import { useRouter } from "next/router"
import Link from "next/dist/client/link"
import dynamic from "next/dynamic"

const GroupsHome = ({ leaders }) => {
    const { userGroups } = useAuth()
    const router = useRouter()
    const [selected , setSelected] = useState<string>(String(router.query.Tab))

  //const Leaderboard = dynamic(() => import("@components/LeaderboardPanel"))
  //const GroupPotrfolios = dynamic(() => import("@components/GroupPortfolios"))
  
  const groupsCards:JSX.Element = useMemo(() => 
    MyComp(userGroups)
  ,[userGroups])
  
  return (

    <div>
        <div className = { (selected ==="My Groups") ? "" : "hidden" }>
        <Link href={`/groups/[Tab]?tab=${selected}`} as={`/currency/${selected}`}>
            {groupsCards}
        </Link>
        </div> 

        <div className = { (selected ==="Leaderboards") ? "" : "hidden" }>
            <LeaderboardPanel leaders = {leaders}/>
        </div>

        <div className = { (selected ==="Other Groups") ? "" : "hidden" }>
            <ComingSoon color="brand-pink" description="">
            <FaUserInjured className={`w-24 h-24 text-brand-pink`} />
            </ComingSoon>
        </div>
    </div>
  )
}
export default GroupsHome

export const getStaticProps = async () => await getLeaderBoardProps()

export const MyComp = (userGroups: string[]) => (
  <GroupPortfolios userGroupsList= {userGroups}/>
)

// TODO fix paths
export async function getStaticPaths() {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

