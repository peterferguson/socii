import { CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { UserPhoto } from "app/components/UserPhoto"
import tw from "app/lib/tailwind"
import React from "react"

const HeaderWithPhoto = ({ title }) => {
  return (
    <CenteredRow style={tw`w-full`}>
      <HeaderTitle headerTitle={title} textStyle={tw`text-center`} />
      <UserPhoto containerStyle={tw`absolute right-4`} />
    </CenteredRow>
  )
}

export default HeaderWithPhoto
