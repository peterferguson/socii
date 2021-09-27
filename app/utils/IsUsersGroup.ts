import { useAuth } from "@hooks/useAuth"
import { useRouter } from "next/router"

export const IsUsersGroup = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { groupName } = router.query
  return user?.groups &&
    user?.groups.includes(Array.isArray(groupName) ? groupName.pop() : groupName)
    ? true
    : null
}
