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

const EmptyValue = ({ active, children = null, ...props }) => (
  <View
    style={{
      borderWidth: 2,
      borderColor: active ? tw.color("brand") : tw.color("gray-300"),
      ...pinValueBaseStyle,
    }}
    {...props}
  >
    {children}
  </View>
)

const PinValue = ({ translateX, value, ...props }) => {
  const filledColor = tw.color("brand")
  return (
    <View {...props}>
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [{ translateX }],
        }}
      >
        {value && value.length ? (
          <FilledValue backgroundColor={filledColor} />
        ) : (
          <EmptyValue active={value.length === 0} />
        )}
        {value && value.length > 1 ? (
          <FilledValue backgroundColor={filledColor} />
        ) : (
          <EmptyValue active={value.length === 1} />
        )}
        {value && value.length > 2 ? (
          <FilledValue backgroundColor={filledColor} />
        ) : (
          <EmptyValue active={value.length === 2} />
        )}
        {value && value.length > 3 ? (
          <FilledValue backgroundColor={filledColor} />
        ) : (
          <EmptyValue active={value.length === 3} />
        )}
      </Animated.View>
    </View>
  )
}

export default React.memo(PinValue)
