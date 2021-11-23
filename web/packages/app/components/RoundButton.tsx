import tw from "app/lib/tailwind"
import { ArrowRight2 } from "iconsax-react-native"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const LABEL_STYLE = tw`text-lg text-center font-poppins-500 uppercase border border-transparent`

// TODO: Generalise this to be a reusable component
export const RoundButton = ({
  onPress,
  label,
  gradientColors = [],
  textColor = null,
  labelStyle = null,
  showArrow = true,
}) =>
  gradientColors && gradientColors.length > 0 ? (
    <View style={tw`rounded-full overflow-hidden`}>
      <LinearGradient
        colors={gradientColors}
        style={tw.style(`justify-center w-full px-4 py-2`)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Button
          label={label}
          labelStyle={[LABEL_STYLE, labelStyle]}
          onPress={onPress}
          textColor={textColor}
          showArrow={showArrow}
        />
      </LinearGradient>
    </View>
  ) : (
    <Button
      textColor={textColor}
      label={label}
      labelStyle={[LABEL_STYLE, labelStyle]}
      onPress={onPress}
      showArrow={showArrow}
    />
  )

const Button = ({ label, labelStyle, textColor, onPress, showArrow }) => {
  return (
    <Pressable style={tw`justify-center w-full px-4 py-2`} onPress={onPress}>
      <Text style={[LABEL_STYLE, labelStyle, { color: textColor }]}>{label}</Text>
      <View style={tw`absolute -right-1`}>
        {showArrow ? <ArrowRight2 size="20" color={textColor} /> : null}
      </View>
    </Pressable>
  )
}
