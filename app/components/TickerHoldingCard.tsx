// TODO 
// - check missmatch values between iex and alpaca - off by $1.05 on 751.53, seems alot
// - order holdings list by size
// - pin overall summary to bottom of the card

import { pnlTextColor } from "@utils/pnlTextColor"
import React , { useEffect, useState} from "react"
import { useAuth} from "@hooks"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { getGroupData } from "@lib/firebase/client/db"
import { getStockHoldingData } from "@lib/firebase/client/db"

// TODO: Create a card for displaying the current holding information & splits by group on interaction
export default function TickerHoldingCard ({ 
  holding ,  
  tickerSymbol,
  price,
  isPriceLoading, }) {

  const [groupHoldings, setHoldings] = useState(Array())
  const [userGroups, setGroups] = useState(null)
  const { user } = useAuth()
  const [groupMemberCount , setGroupMemberCount] = useState({})

  useEffect(() => {
    if (user?.groups) {
      setGroups(user?.groups)
    }
  }, [user?.groups])

  useEffect(()=>{
    if (userGroups) {
      userGroups.map((group) => {
        getGroupData(group).then((data)=>
          setGroupMemberCount((prev) => ({...prev, [group]: data.investorCount})) 
          )
      })
    }
  },[userGroups])

  useEffect(() => {
    if(holding?.qty && user?.groups){
      // if groupHoldings!=null then set to null to avoid duplicates on qty change
      if (groupHoldings) setHoldings(Array())

      user?.groups?.map((groupName) =>{
        getStockHoldingData(groupName, tickerSymbol).then((data) => {
          setHoldings((prev) => ([ ...prev, {...data, groupName} ]))
        })}
      )
    }
  }, [user?.groups, holding?.qty])

    return (
      <div className=" flex flex-col mx-2 mt-4 mb-2 bg-white shadow-lg sm:mt-2 rounded-2xl dark:bg-gray-800">
        <div className="flex items-center p-2">
          <span className="mb-2 ml-2 text-base font-semibold tracking-wider text-gray-700 uppercase dark:text-white">
                My Positions
          </span>   
        </div>
        <div className="divide-y divide-black">
          {groupHoldings?.map((details, i )=> (
              details.qty ? (
                <div className="flex flex-row" key={i}>
                  <span className="px-2 text-brand font-semibold">
                    {details.groupName}: 
                  </span>
                  <span className="px-4 text-xl text-gray-700 font-semibold">
                    {((parseFloat(details.qty) * parseFloat(holding.currentPrice))/groupMemberCount[details.groupName]).toFixed(2)} 
                  </span>
                  <span> 
                    {(parseFloat(details.qty)/groupMemberCount[details.groupName]).toFixed(2)} 
                    <p className="flex justify-center text-gray-400 text-tiny -pb-0.5 ">shares</p>
                  </span>
                </div>
              ):(
                null
                )
          ))}
        </div>
        <div className="flex flex-row bg-brand-light rounded-2xl">
          <div className="flex px-3 flex-col pt-1">
            <div
              className={`flex items-center text-sm pb-0.5 ${pnlTextColor(
                parseFloat(holding?.unrealizedPlpc)
              )}`}
            >
              {parseFloat(holding?.unrealizedPlpc) > 0 ? <FaCaretUp /> : <FaCaretDown />}
              <span className="pr-1">{(holding?.unrealizedPlpc * 100)?.toFixed(2)}%</span>
            </div >
              <p className="flex justify-center text-gray-400  text-tiny -pb-0.5 ">overall</p>
          </div>
          <div>
            <p className="text-3xl  font-semibold text-gray-700 dark:text-gray-100">
            <span className="text-sm">$</span>
              {parseFloat(holding?.marketValue).toFixed(2)}
            </p>
          </div>
          <div className="flex px-3 flex-col pt-1">
            <span className="pr-1">{parseFloat(holding?.qty)?.toFixed(2)}</span>
            <p className="flex justify-center text-gray-400 text-tiny -pb-0.5 ">shares</p>
          </div>
        </div>
      </div>
    )
};
