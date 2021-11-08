import tw from "app/lib/tailwind"
import React from "react"
import Animated from "react-native-reanimated"
import { View } from "react-native"

const pinValueBaseStyle = {
  width: 20,
  height: 20,
  borderRadius: 20,
  marginLeft: 10,
  marginRight: 10,
}

const FilledValue = ({ children = null, ...props }) => (
  <View style={pinValueBaseStyle} {...props}>
    {children}
  </View>
)

const fillColor = tw.color("brand")

const EmptyValue = ({ active, children = null, ...props }) => (
  <View
    style={{
      borderWidth: 2,
      borderColor: active ? fillColor : tw.color("gray-300"),
      ...pinValueBaseStyle,
    }}
    {...props}
  >
    {children}
  </View>
)

const PinValue = ({ translateX, value, ...props }) => {
  return (
    <View {...props}>
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX: translateX ? translateX : 0 }],
        }}
      >
        {[0, 1, 2, 3].map(i => (
          <PinDot key={i} index={i} value={value} />
        ))}
      </Animated.View>
    </View>
  )
}

const PinDot = ({ value, index }) =>
  value && value.length > index ? (
    <FilledValue backgroundColor={fillColor} />
  ) : (
    <EmptyValue active={value.length === index} />
  )

export default React.memo(PinValue)
