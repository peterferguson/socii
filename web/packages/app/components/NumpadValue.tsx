import MaskedView from "@react-native-community/masked-view"
import React from "react"
import RadialGradient from "react-native-radial-gradient"
import Animated from "react-native-reanimated"
import { Text, Dimensions } from "react-native"
import tw from "app/lib/tailwind"

const FONT_SIZE_MULTIPLE = 0.24
const HEIGHT_MULTIPLE = 0.288
const { width: SCREEN_WIDTH } = Dimensions.get("window")

const GradientBackground = ({ width }) => {
  const radius = width - 48

  const gradientProps = {
    center: [radius, 53.5],
    colors: ["#FFB114", "#FF54BB", "#00F0FF", "#34F3FF"],
    radius,
    stops: [0.2049, 0.6354, 0.8318, 0.9541],
  }

  return (
    <RadialGradient
      {...gradientProps}
      style={{ height: Math.round(width * HEIGHT_MULTIPLE), width: "100%" }}
    />
  )
}

const TextMask = props => (
  <Animated.View {...props} style={{ left: "-50%", width: "200%", ...props.style }}>
    {props.children}
  </Animated.View>
)

const ValueText = props => (
  <Text
    {...props}
    style={{
      align: "center",
      color: tw.color("white"),
      letterSpacing: "roundedTightest",
      lineHeight: Math.round(SCREEN_WIDTH * HEIGHT_MULTIPLE),
      size: Math.round(SCREEN_WIDTH * FONT_SIZE_MULTIPLE),
      weight: "bold",
      ...props.style,
    }}
  >
    {props.children}
  </Text>
)

const NumpadValue = ({ scale, translateX, value, ...props }) => {
  const maskElement = (
    <TextMask style={{ transform: [{ scale, translateX }] }}>
      <ValueText width={SCREEN_WIDTH}>{"$" + (value ? value : "0")}</ValueText>
    </TextMask>
  )

  return (
    <MaskedView maskElement={maskElement} {...props}>
      <GradientBackground width={SCREEN_WIDTH} />
    </MaskedView>
  )
}

export default React.memo(NumpadValue)
