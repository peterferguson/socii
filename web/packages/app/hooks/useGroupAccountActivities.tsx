import { useEffect, useState } from "react"
import { getGroupTradeHistory } from "../lib/firebase/client/db/getGroupTradeHistory"
import { Timestamp } from "../firebase/firestore"

// TODO remove duplicate GroupTradeItem declaration
export interface GroupTradeItem {
  asset: string
  side: string
  notional: string
  type: string
  username: string
  messageId: string
  executionStatus: string
  timestamp: Timestamp
}

export const useGroupAccountActivities = (groupName: string) => {
  const [groupTrades, setNews] = useState<GroupTradeItem[]>([])
  const [dbFetchError, setDbFetchError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGroupTradeHistory(groupName)
      .then((trades) => {
        if (trades.length > 0) {
          setNews(trades)
          setLoading(false)
        }
      })
      .catch((e) => {
        console.log("error fetching trades from firebase", e)
        setDbFetchError(true)
      })
    if (groupTrades.length === 0 || dbFetchError) {
      //TODO deal with empty case
    }
  }, [groupName, groupTrades.length, dbFetchError])

  return { activities: groupTrades ? groupTrades : [], loading }
}
