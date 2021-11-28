import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import tw from "app/lib/tailwind"
import { TabBarIcon } from "../navigation/tab-bar-icon"

const routeIconNames = {
  enter: "home",
  groups: "users",
  chat: "message-circle",
  stocks: "globe",
}

function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={tw`flex-row bg-white ios:pb-4 rounded-2xl`}>
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

        const onLongPress = () =>
          navigation.emit({ type: "tabLongPress", target: route.key })

        const focussedColor = tw.color(
          isFocused ? "brand" : "brand-black dark:brand-gray"
        )

        return (
          <TouchableOpacity
            key={route.key}
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
              <TabBarIcon name={routeIconNames[route.name]} color={focussedColor} />
            </View>
            <Text
              style={tw.style(`text-tiny text-brand-black text-center`, {
                color: focussedColor,
              })}
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
