// TODO:
// - speed up render. attempted usememo but still takes time
// - Potential:
//   - add "followed groups" page to check status of other open groups

import ComingSoon from "@components/ComingSoon"
import { GroupPortfoliosDynamic } from "@components/GroupPortfolios"
import { LeaderboardPanel } from "@components/LeaderboardPanel"
import { TabHeading } from "@components/TabHeading"
import { TabPanels } from "@components/TabPanels"
import { Tab } from "@headlessui/react"
import { getLeaderBoardProps } from "@utils/getLeaderBoardProps"
import { updateTradeEvents } from "@utils/updateTradeEvents"
import React, { useState } from "react"
import { FaUserInjured } from "react-icons/fa"

const GroupsHome = ({ leaders }) => {
  const [selected, setSelected] = useState("My Groups")
  let [categories] = useState({
    "My Groups": [],
    Leaderboards: [],
    "Other Groups": [],
  })

  return (
    <Tab.Group onChange={(index) => setSelected(Object.keys(categories)[index])}>
      <div className="container flex flex-col items-center overflow-x-hidden">
        <div className="flex flex-row justify-center w-full font-primary">
          <TabHeading categories={categories} className="w-full m-4 sm:m-0" />
        </div>
        <TabPanels categories={categories} panelBackgroundColor="transparent">
          <div className={selected === "My Groups" ? "" : "hidden"}>
            <GroupPortfoliosDynamic />
          </div>
          <div className={selected === "Leaderboards" ? "" : "hidden"}>
            <LeaderboardPanel leaders={leaders} />
          </div>
          <div className={selected === "Other Groups" ? "" : "hidden"}>
            <ComingSoon color="brand-pink" description="">
              <FaUserInjured className={`w-24 h-24 text-brand-pink`} />
            </ComingSoon>
          </div>
        </TabPanels>
      </div>
    </Tab.Group>
  )
}

export const getStaticProps = async () => {
  const {
    props: { leaders },
  } = await getLeaderBoardProps()

  updateTradeEvents()

  return { props: { leaders } }
}

export default GroupsHome
