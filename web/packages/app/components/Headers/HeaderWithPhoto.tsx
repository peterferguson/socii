import { CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { UserPhoto } from "app/components/UserPhoto"
import tw from "app/lib/tailwind"
import React from "react"
import { View } from "react-native"
import { useNavigation, DrawerActions } from "@react-navigation/native"

const HeaderWithPhoto = ({ title }) => {
  const navigation = useNavigation()
  return (
    <>
      <UserPhoto
        overrideOnPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />

      <HeaderTitle title={title} textStyle={tw`text-center`} />
      {/* Dummy component to title sit in the center */}
      <View style={tw`mr-6 w-7`} />
    </>
  )
}

export default HeaderWithPhoto
