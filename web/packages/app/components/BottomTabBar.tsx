import tw from "../lib/tailwind"
import React, { useMemo } from "react"
import Socii from "./Logos/Socii"
import { View, TouchableOpacity, Text } from "react-native"
import { TabBarIcon } from "../navigation/tab-bar-icon"

// const Footer = () => {
//   //   const { user } = useAuth()
//   //   const username = user ? user.username : ""
//   //   const isChatRoute = router.pathname.startsWith("/chat")

//   let user, username, router

//   const navLinks = useMemo(
//     () => links(user, username, router),
//     [user, username, router]
//   )

//   return (
//     <View style={tw`fixed inset-x-0 bottom-0 w-full mt-12 bg-white sm:hidden z-40`}>
//       {navLinks.map(({ text, Icon, onClick, isActive, Component }, i) => {
//         const props = { text, Icon, onClick, isActive, index: i }
//         return <Component key={`nav-item-${i}`} props={props} />
//       })}
//     </View>
//   )
// }

// interface FooterItemProps {
//   text?: string
//   Icon?: React.FC<{ className }>
//   onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void
//   isActive?: boolean
//   Component?: React.FC
//   index?: number
// }

// export const FooterNavItem = ({
//   text,
//   Icon,
//   onClick,
//   isActive,
//   index,
// }: FooterItemProps) => {
//   return (
//     <Button
//       style={tw.style(
//         "flex flex-col items-center justify-center w-full py-2",
//         index === 0 ? "ml-4" : "mr-4",
//         isActive && "text-brand-cyan-vivid",
//         `umami--click--footer-nav-item-${text.toLowerCase()}`
//       )}
//       onClick={onClick}
//     >
//       <Icon className="w-5 h-5 mx-auto mb-1" />
//       <Text style={tw`text-tiny text-brand-dark text-center`}>{text}</Text>
//     </Button>
//   )
// }

// const links = (user: FirebaseUser, username: string, router: NextRouter) => [
//   {
//     text: !user ? "Home" : "Groups",
//     Icon: !user ? HiOutlineHome : HiOutlineUserGroup,
//     onClick: () => router.push(!user ? "/" : "/groups"),
//     isActive:
//       !router.asPath.slice(1) ||
//       (router.asPath.includes("groups") && !router.asPath.includes("portfolio")),
//     Component: ({ props }) => <FooterNavItem {...props} />,
//   },
//   {
//     onClick: () => {},
//     Component: ({ props }) => <FooterSearchButton {...props} username={username} />,
//   },
//   {
//     text: "Stocks",
//     Icon: HiOutlineGlobe,
//     onClick: () => router.push("/stocks"),
//     isActive: router.asPath.includes("stocks"),
//     Component: ({ props }) => <FooterNavItem {...props} />,
//   },
// ]

// const FooterSearchButton = () => (
//   <Button style={tw`relative w-full`}>
//     <View
//       style={tw.style(
//         `absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 p-2 font-primary bg-white
//          text-tiny text-brand-dark text-center  shadow-xl rounded-full flex
//          transition duration-300 items-center justify-center
//          umami--click--footer-logo-button-click`
//       )}
//     >
//       <Socii style={tw`text-5xl p-0.5`} />
//     </View>
//   </Button>
// )

// export default React.memo(Footer)

const iconNames = ["home", "users", "globe"]

function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={tw`flex-row bg-white ios:pb-4`}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw`flex-1 items-center justify-center w-full py-2 ${
              index === 0 ? "ml-4" : "mr-4"
            }`}
          >
            <View style={tw`mx-auto mb-1`}>
              <TabBarIcon
                //@ts-ignore
                name={iconNames[index]}
                color={isFocused ? tw.color("text-brand") : "#222"}
              />
            </View>
            <Text
              style={{
                ...tw`text-tiny text-brand-dark text-center`,
                color: isFocused ? tw.color("text-brand") : "#222",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default BottomTabBar
