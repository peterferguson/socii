// TODO:
//  - replace tmp code for leaderboard with real connection
//  - make a seperate component for creating the tab headers / panels
//    to reduce repeted code and make more flexible to changes
//  - correct routing: Decide what page will be shown for groups / user portfolio
//  - Fix centering? Is it just me or does the portfolio card not look centered
//
// - Potential:
//   - add "followed groups" page to check status of other open groups


import React , { Fragment , useState} from "react"
import LeaderBoardCard from "@components/LeaderBoardCard"
//import { getLeaderBoardProps } from "../../utils/getLeaderBoardProps"
import { useAuth } from "@hooks"
import { Tab } from '@headlessui/react'
import { setUserState } from "@lib/firebase/client/db"
import { GroupPortfolios } from "@components/GroupPortfolios"

const GroupsHome = ({ leaders }) => {
  const { userGroups } = useAuth()
  const [selectedTab , setSelectedTab] = useState("My Groups")

  return (
    
    <Tab.Group>
      <div className = "container flex flex-col center" > 
        <div className="flex flex-row justify-center bg-white rounded-lg shadow-lg font-primary text-l divide-x-2 divide-blue-500">
          <Tab.List>
            <Tab>
              <button 
              onClick={() => setSelectedTab("My Groups")} 
              className = {"px-5 py-5 bg-gray-100 "+( (selectedTab==="My Groups") ? "font-bold border-b-2 border-blue-500" : "") +"hover:border-b-2 border-blue-500"}>
                My Groups 
              </button>
            </Tab>
            <Tab>
              <button 
              onClick={() => setSelectedTab("Leaderboards")} 
              className = {"px-5 py-5 bg-gray-100 "+( (selectedTab==="Leaderboards") ? "font-bold border-b-2 border-blue-500" : "") +"hover:border-b-2 border-blue-500"}>
                Leaderboards
              </button>
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div className="flex justify-center">
            <div className= "flex-col justify-center w-10/12 py-4 bg-gray-300 rounded-lg shadow-lg">
              <Tab.Panel><GroupPortfolios userGroupsList= {userGroups} /></Tab.Panel>

              <Tab.Panel>
                <section className="flex flex-col justify-between ">
                  <div className="max-w-4xl mx-4 mt-12 sm:mt-20 md:mx-auto space-y-4">
                    <h1 className="mb-8 text-3xl font-bold tracking-wide uppercase font-primary">
                      Leaderboard
                    </h1>
                    <span className="text-sm font-primary">
                      The leaderboard is a list of the top performing groups on socii.
                      <br />
                      <br />
                      <p>How does your group compare against other sociians?</p>
                      <br />
                      <br />
                    </span>
                    {leaders?.map((leader, rank) => (
                      <LeaderBoardCard
                        key={`leader-${rank}-${leader.groupName}`}
                        rank={rank}
                        leader={
                          userGroups.includes(leader.groupName)
                            ? { inGroup: true, ...leader }
                            : leader
                        }
                      />
                    ))}
                    <p className="mt-8 font-primary text-tiny">
                      All gains shown reflect the month to date performance of each group. Only
                      public groups are displayed
                    </p>
                  </div>
                </section>
              </Tab.Panel>

            </div>
          </div>
          </Tab.Panels>
      </div>
    </Tab.Group>


  )
}
export default GroupsHome

//export const getStaticProps = async () => await getLeaderBoardProps()



