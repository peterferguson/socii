import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import tw from "../lib/tailwind"
import { TabBarIcon } from "../navigation/tab-bar-icon"

const iconNames = ["home", "users", "message-circle", "globe"]

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
              <TabBarIcon
                //@ts-ignore
                name={iconNames[index]}
                color={
                  isFocused ? tw.color("text-brand") : tw.color("text-brand-black")
                }
              />
            </View>
            <Text
              style={{
                ...tw`text-tiny text-brand-black text-center`,
                color: isFocused
                  ? tw.color("text-brand")
                  : tw.color("text-brand-black"),
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
