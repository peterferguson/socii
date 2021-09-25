// TODO:
// potentially add all the surrounding tab context to the page.... would this cause issues for certain non users?

import { LeaderboardPanel } from "@components/LeaderboardPanel"
import { getLeaderBoardProps } from "@utils/getLeaderBoardProps"

const GroupsHome = ({ leaders }) => {
  return (
    <div className="p-3 bg-white rounded-2xl focus:outline-none">
      <LeaderboardPanel leaders={leaders} />
    </div>
  )
}
export default GroupsHome

export const getStaticProps = async () => await getLeaderBoardProps()
