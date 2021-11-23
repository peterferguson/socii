import { CenteredColumn } from "../Centered"
import tw from "app/lib/tailwind"
import React from "react"
import { Dimensions, Pressable, Text, View } from "react-native"

const { width: WINDOW_WIDTH } = Dimensions.get("window")
const BUTTON_WIDTH = WINDOW_WIDTH - 32

const ModalSelectButton = ({ onPress, Icon, title, description }) => (
  <Pressable
    style={tw.style(`flex-row w-full p-4 my-2 bg-white shadow-md rounded-2xl`, {
      width: BUTTON_WIDTH,
    })}
    onPress={onPress}
  >
    {Icon && (
      <View style={tw`mr-2 items-center justify-center flex-1`}>
        <Icon />
      </View>
    )}
    <View style={tw`flex-6`}>
      <CenteredColumn style={tw.style(`flex-col items-start`)}>
        {title && (
          <Text
            style={tw`font-poppins-500 text-lg text-brand-black`}
            numberOfLines={2}
            lineBreakMode="head"
            adjustsFontSizeToFit={true}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            style={tw`font-poppins-400 text-xs text-gray-400`}
            // numberOfLines={2}
            // adjustsFontSizeToFit={true}
          >
            {description}
          </Text>
        )}
      </CenteredColumn>
    </View>
  </Pressable>
)

export default ModalSelectButton
