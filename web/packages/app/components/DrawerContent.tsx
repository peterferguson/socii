import { DrawerContentScrollView } from "@react-navigation/drawer"
import { useAuth, useStream, useTradingAccount } from "app/hooks"
import tw from "app/lib/tailwind"
import Logo from "./Logos/SociiText"
import {
  Coin1,
  DirectboxSend,
  MoneyRecive,
  Notification1,
  People,
  Settings,
} from "iconsax-react-native"
import React, { useCallback, useEffect } from "react"
import { Image, Pressable, Share, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useRouter } from "../navigation/use-router"
import { CenteredColumn, CenteredRow } from "./Centered"
import { LoginOptions, LoginOptionsButtonType } from "./LoginOptions"

export const externalURLs = {
  sociiHomepage: "https://socii.app",
  // rainbowLearn: 'https://rainbow.me/learn',
  // review:
  //   'itms-apps://itunes.apple.com/us/app/appName/id1457119021?mt=8&action=write-review',
  // twitterDeepLink: 'twitter://user?screen_name=rainbowdotme',
  // twitterWebUrl: 'https://twitter.com/rainbowdotme',
}

const randomHex = () => {
  let letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const CustomDrawer = props => {
  const router = useRouter()
  const { user } = useAuth()

  return user ? (
    <>
      <View style={{ flex: 1 }}>
        <DrawerHeader />
        <DrawerContentScrollView {...props}>
          <View style={tw`pl-5 -mt-12`}>
            <DrawerNavItem onPress={() => {}} Icon={MoneyRecive} label={"Add Cash"} />
            <DrawerNavItem
              onPress={() => router.push("/groups/new")}
              Icon={People}
              label={"Create a Group"}
            />
          </View>
        </DrawerContentScrollView>
        <DrawerFooter />
      </View>
    </>
  ) : (
    <View style={{ flex: 1 }}>
      <NotAuthenticatedDrawerHeader />
      <Text style={tw`mt-24 mb-3 text-base text-center text-gray-600 font-poppins-300`}>
        Please connect with one of the following providers
      </Text>
      <LoginOptions buttonType={LoginOptionsButtonType.SIGN_IN} />
    </View>
  )
}

const NotAuthenticatedDrawerHeader = props => {
  const { top: paddingTop } = useSafeAreaInsets()
  return (
    <CenteredColumn style={tw.style(`pb-5`, { paddingTop })}>
      <Logo width={120} height={120} />
    </CenteredColumn>
  )
}

// const SelectProfileBackgroundModal = () => {

// }

export default CustomDrawer

const DrawerHeader = () => {
  const { user } = useAuth()
  const { top: safeAreaTop } = useSafeAreaInsets()
  const { account } = useTradingAccount()
  const { client } = useStream()
  const [online, setOnline] = React.useState(client?.user?.online)

  useEffect(
    () => client?.user && setOnline(client?.user?.online),
    [client?.user?.online]
  )

  //   useEffect(() => {
  //     const unreadCount = client.on(event => {
  //       console.log("DrawerHeader", { event })
  //       if (event.total_unread_count !== undefined) {
  //         console.log(event.total_unread_count)
  //       }
  //     })

  //     return () => unreadCount.unsubscribe()
  //   }, [])

  return (
    <CenteredColumn
      style={tw.style(`pl-5 pb-5 items-start justify-start`, {
        paddingTop: 20 + safeAreaTop,
        // backgroundColor: randomHex(),
      })}
    >
      <CenteredRow style={tw`justify-between items-start`}>
        <View style={tw`flex-1`}>
          <Image
            source={{ uri: user?.photoUrl }}
            width={48}
            height={48}
            style={tw`h-12 w-12 rounded-full mb-3 border border-white`}
          />
        </View>
        <View style={tw`flex-4`} />
        <Pressable onPress={() => {}} style={tw`flex-1`}>
          <View
            style={tw`absolute right-5 z-50 top-0.25 rounded-full h-2 w-2 bg-red-400`}
          />
          <Notification1 size="24" color={tw.color("brand-black")} />
        </Pressable>
      </CenteredRow>
      <CenteredRow style={tw`items-end`}>
        <CenteredColumn style={tw`items-start`}>
          <Text style={tw`text-lg font-open-sans-700`}>{user?.displayName}</Text>
          <Text
            style={tw`text-sm font-open-sans-400 mb-2 remove-font-padding text-center`}
          >
            @{user?.username}
          </Text>
          <CenteredRow>
            <Coin1 size="18" color="#000" />
            <Text style={tw`ml-1 font-open-sans-600`}>
              {parseFloat(account?.buyingPower)?.toFixed(2)}
            </Text>
          </CenteredRow>
        </CenteredColumn>
      </CenteredRow>
      {client?.user && user?.username ? (
        <TouchableOpacity
          onPress={() => toggleUserPresence(client, user?.username)}
          style={tw`mt-4 -ml-2 rounded-full border ${
            !client.user.invisible ? "border-green-500" : "border-red-500"
          } p-2 w-full`}
        >
          <CenteredRow>
            <View
              style={tw`rounded-full h-2 w-2 mr-2 mt-0.5 ${
                !client.user.invisible ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <Text
              style={tw`text-sm font-open-sans-400 text-center ${
                !client.user.invisible ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {!client.user.invisible ? "Online" : "Offline"}
            </Text>
          </CenteredRow>
        </TouchableOpacity>
      ) : null}
    </CenteredColumn>
  )
}

const toggleUserPresence = async (client, username) => {
  console.log("toggleUserPresence", { username, user: client.user })
  await client.upsertUser({
    id: username,
    invisible: client.user.invisible ? false : true,
  })

  // queryUsers allows you to listen to user presence changes for john and jack
  const users = await client.queryUsers(
    { id: { $in: [username] } },
    { id: -1 },
    { presence: true }
  )
  console.log("toggleUserPresence", { users })

  console.log("toggleUserPresence", { invisible: client.user.invisible })
}

const DrawerFooter = () => {
  const router = useRouter()

  const onPressShare = useCallback(() => {
    Share.share({
      message: `👋️ Hey friend! You should checkout socii, it is a new app for investing with friends ${externalURLs.sociiHomepage}`,
    })
  }, [])

  return (
    <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
      <DrawerNavItem
        onPress={onPressShare}
        Icon={DirectboxSend}
        label={"Share with a friend"}
      />
      <DrawerNavItem
        label={"Settings"}
        onPress={() => router.push("/settings")}
        Icon={Settings}
      />
    </View>
  )
}

const DrawerNavItem = ({ onPress, label, Icon }) => (
  <TouchableOpacity onPress={onPress} style={tw`py-4`}>
    <CenteredRow>
      <Icon size="24" color={tw.color("brand-black")} style={tw`flex-1`} />
      <Text style={tw`flex-6 font-poppins-500 ml-2.5`}>{label}</Text>
    </CenteredRow>
  </TouchableOpacity>
)
