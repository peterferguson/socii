import { userFirstName } from "@utils/userFirstName"
import router from "next/router"
import toast from "react-hot-toast"

export const loginRedirect = (
  displayName: string,
  username: string,
  userGroups: string[]
) => {
  toast.dismiss()
  router.push(
    !username ? "/user/create" : userGroups.length ? `/user/${username}` : "/stocks"
  )
  toast.success(`Welcome ${userFirstName(displayName)}`)
}
