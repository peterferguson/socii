import { CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { UserPhoto } from "app/components/UserPhoto"
import tw from "app/lib/tailwind"
import React from "react"

const HeaderWithPhoto = ({ title }) => {
  return (
    <CenteredRow style={tw`w-full`}>
      <CenteredRow style={tw`-mt-2`}>
        <HeaderTitle headerTitle={title} textStyle={tw`text-center`} />
      </CenteredRow>
      <CenteredRow style={tw`absolute right-6 bottom-1`}>
        <UserPhoto />
      </CenteredRow>
    </CenteredRow>
  )
}

export default HeaderWithPhoto
