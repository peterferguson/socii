import { useState, useEffect } from "react"
import { Unsubscribe } from "@firebase/firestore"
import { getGroupCashBalance } from "app/lib/firebase/db/getGroupCashBalance"

export const useGroupCashBalance = (groupName: string) => {
  const [cashBalance, setCashBalance] = useState<number>(undefined)
  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (groupName)
      getGroupCashBalance(groupName, setCashBalance).then(unsub => {
        unsubscribe = unsub
      })
    return () => unsubscribe?.()
  }, [groupName])

  return cashBalance
}
