import { DrawerContentScrollView } from "@react-navigation/drawer"
import { useAuth, useTradingAccount } from "app/hooks"
import tw from "app/lib/tailwind"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CenteredRow, CenteredColumn } from "./Centered"
import { LoginOptions, LoginOptionsButtonType } from "./LoginOptions"
import { Coin1 } from "iconsax-react-native"

const randomHex = () => {
  let letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const CustomDrawer = props => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerHeader />
      <DrawerContentScrollView {...props}>
        {/* <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View> */}
      </DrawerContentScrollView>
      <DrawerFooter />
    </View>
  )
}

export default CustomDrawer

const DrawerHeader = () => {
  const { user } = useAuth()
  const { top: safeAreaTop } = useSafeAreaInsets()

  const { account, error } = useTradingAccount()

  return (
    <CenteredRow
      style={tw.style(`pl-5 pb-5 justify-start`, {
        paddingTop: 20 + safeAreaTop,
        backgroundColor: randomHex(),
      })}
    >
      <Image
        source={{ uri: user?.photoUrl }}
        style={tw`h-20 w-20 rounded-full mb-3 border-2 border-white`}
      />
      <CenteredColumn style={tw`ml-5 items-start`}>
        <Text style={tw`text-white text-lg font-open-sans-600`}>
          {user?.displayName}
        </Text>
        <Text
          style={tw`text-white text-sm font-open-sans-600 mb-2 remove-font-padding text-center`}
        >
          @{user?.username}
        </Text>
        <CenteredRow style={{ flexDirection: "row" }}>
          <Coin1 size="14" color="#fff" />
          <Text style={tw`ml-2 font-open-sans-300 text-white`}>
            ${account?.buyingPower}
          </Text>
        </CenteredRow>
      </CenteredColumn>
    </CenteredRow>
  )
}

const DrawerFooter = () => {
  const { user } = useAuth()

  return (
    <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
      {!user ? (
        <SignedInFooter />
      ) : (
        <>
          <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Ionicons name="share-social-outline" size={22} /> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Roboto-Medium",
                  marginLeft: 5,
                }}
              >
                Tell a Friend
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Ionicons name="exit-outline" size={22} /> */}
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Roboto-Medium",
                  marginLeft: 5,
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const SignedInFooter = () => {
  return <LoginOptions buttonType={LoginOptionsButtonType.SIGN_IN} />
}
