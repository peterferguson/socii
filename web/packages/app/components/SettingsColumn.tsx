import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "app/hooks/useAuth"
import React from "react"
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import tw from "../lib/tailwind"
import { shadowStyle } from "../utils/shadowStyle"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const LOGOUT_BUTTTON_WIDTH = SCREEN_WIDTH - 64

const SettingsColumn = ({ settingsOptions }) => {
  const { bottom: marginBottom } = useSafeAreaInsets()
  const { signout } = useAuth()
  return (
    <>
      <ScrollView
        contentContainerStyle={tw.style(
          `flex-col items-center justify-left w-full mt-2 p-4 dark:bg-brand-black`,
          // @ts-ignore
          shadowStyle("md")
        )}
      >
        {settingsOptions.map(({ title, subTitle, onPress, icon }) => (
          <SettingRow key={title} {...{ title, subTitle, onPress, icon }} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => signout("/enter", false)}
        style={tw.style(
          `border border-red-500 py-4 rounded items-center justify-center`,
          {
            marginBottom,
            width: LOGOUT_BUTTTON_WIDTH,
          }
        )}
      >
        <Text style={tw`uppercase text-red-500 font-open-sans-700`}>Log Out</Text>
      </TouchableOpacity>
    </>
  )
}

export default SettingsColumn

const SettingRow = ({ title, subTitle, onPress, icon }) => (
  <TouchableOpacity onPress={onPress} style={tw`items-center w-full px-2 my-2`}>
    <View style={tw`flex-row`}>
      <View style={tw`flex-1 justify-center`}>
        <Ionicons name={icon} size={24} color={"black"} />
      </View>
      <View style={tw.style(`flex-8 px-2`)}>
        <Text style={tw`text-base font-open-sans-600`}>{title}</Text>
        {subTitle && (
          <Text style={tw`font-open-sans-400 text-xs text-gray-400`}>{subTitle}</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
)
