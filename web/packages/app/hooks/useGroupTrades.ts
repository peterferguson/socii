import { Timestamp } from "@firebase/firestore"
import { useEffect, useState } from "react"
import {
  getGroupTradeHistory,
  GroupTradeItem,
} from "../lib/firebase/client/db/getGroupTradeHistory"

export const useGroupTrades = (groupName: string) => {
  const [groupTrades, setGroupTrades] = useState<GroupTradeItem[]>([])
  const [dbFetchError, setDbFetchError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGroupTradeHistory(groupName)
      .then(trades => {
        if (trades.length > 0) {
          setGroupTrades(trades)
          setLoading(false)
        }
      })
      .catch(e => {
        console.log("error fetching trades from firebase", e)
        setDbFetchError(true)
      })
    if (groupTrades.length === 0 || dbFetchError) {
      //TODO deal with empty case
    }
  }, [groupName, groupTrades.length, dbFetchError])

  return { activities: groupTrades ? groupTrades : [], loading }
}
