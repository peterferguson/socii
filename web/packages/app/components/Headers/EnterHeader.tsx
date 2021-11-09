import React from "react"
import { useAuth } from "app/hooks/useAuth"
import { userFirstName } from "app/utils/userFirstName"
import HeaderContainer from "./HeaderContainer"

const EnterHeader = ({ headerTitle }: { headerTitle: string }) => {
  const { user } = useAuth()
  return (
    <HeaderContainer
      headerTitle={headerTitle}
      text={`Welcome ${userFirstName(user?.displayName)}`}
    />
  )
}

export default EnterHeader
