import { useAuth } from "./useAuth"
import { getGroupData } from "../lib/firebase/db/getGroupData"
import { useEffect, useState } from "react"

export const useGroups = () => {
  const { user } = useAuth()
  const [groupsData, setGroupsData] = useState<{ [groupName: string]: any }>(null)

  useEffect(() => {
    user?.groups?.map(groupName =>
      getGroupData(groupName).then(data => {
        setGroupsData(prev => ({ ...prev, [groupName]: data }))
      })
    )
  }, [user?.groups])

  return groupsData
}
