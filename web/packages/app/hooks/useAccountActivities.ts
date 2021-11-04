import { useAuth } from "./useAuth"
import { ActivityItem, ActivityType } from "alpaca"
import { fetcher } from "../utils/fetcher"
import useSWR from "swr"

export interface IAccountActivites {
  type?: ActivityType
  date?: string
  until?: string
  after?: string
  direction?: string //- "asc" | "desc"
  accountId?: string
  pageSize?: number
  pageToken?: string
}

export const useAccountActivities = ({
  type,
  date,
  until,
  after,
  direction,
  pageSize,
  pageToken,
}: IAccountActivites) => {
  const { user } = useAuth()

  const { data: activities, error } = useSWR<ActivityItem[]>(
    user?.token && user?.alpacaAccountId
      ? ["/api/alpaca/activities", user?.token, user?.alpacaAccountId]
      : null,
    (url, token, alpacaId) => {
      const res = fetcher(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          accountId: alpacaId,
          type,
          date,
          until,
          after,
          direction,
          pageSize,
          pageToken,
        }),
      })
      return res
    },
    { refreshInterval: 3600 * 1000, refreshWhenOffline: false }
  )

  return { activities: activities ? activities : [], error }
}
