import React from "react"
import { useAuth } from "../../hooks/useAuth"
import { userFirstName } from "../../utils/userFirstName"
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
