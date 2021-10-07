// TODO:
// - speed up render. attempted usememo but still takes time
// - Potential:
//   - add "followed groups" page to check status of other open groups

import { GroupPortfoliosDynamic } from "@components/GroupPortfolios"
import { LeaderboardPanelDynamic } from "@components/LeaderboardPanel"
import { TabHeading } from "@components/TabHeading"
import { TabPanels } from "@components/TabPanels"
import { Tab } from "@headlessui/react"
import { getLeaderBoardProps } from "@utils/getLeaderBoardProps"
import { updateTradeEvents } from "@utils/updateTradeEvents"
import React, { useState } from "react"

const GroupsHome = ({ leaders }) => {
  const [selected, setSelected] = useState("My Groups")
  let [categories] = useState({
    "My Groups": [],
    Leaderboards: [],
    // "Other Groups": [],
  })

  return (
    <Tab.Group onChange={(index) => setSelected(Object.keys(categories)[index])}>
      <div className="container flex flex-col items-center overflow-x-hidden">
        <div className="flex flex-row justify-center w-full mt-4 font-primary">
          <TabHeading categories={categories} className="w-full m-4 sm:m-0 " />
        </div>
        <TabPanels categories={categories} panelBackgroundColor="transparent">
          <ul>
            {selected === "My Groups" ? (
              <GroupPortfoliosDynamic />
            ) : selected === "Leaderboards" ? (
              <LeaderboardPanelDynamic leaders={leaders} />
            ) : null}
          </ul>
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
