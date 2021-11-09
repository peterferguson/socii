import React, { useCallback, useEffect, useState } from "react"
import { Text, View, Pressable } from "react-native"
import get from "lodash/get"
import Animated, { spring } from "react-native-reanimated"
import { useValues } from "react-native-redash/src/v1"
import useDimensions from "../hooks/useDimensions"
import tw from "app/lib/tailwind"
import magicMemo from "../utils/magicMemo"

const springTo = (node, toValue) =>
  spring(node, {
    damping: 38,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
    stiffness: 600,
    toValue,
  }).start()

let calculatedItemWidths = 0
let positions = []
let widths = []

function resetPositionCalculations() {
  calculatedItemWidths = 0
  positions = []
  widths = []
}

const TimespanSelector = ({
  backgroundColor,
  defaultIndex = 0,
  // disableSelection,
  // enableHapticFeedback,
  height,
  items,
  onSelect,
  ...props
}) => {
  const [selected, setSelected] = useState(defaultIndex)
  const [translateX, width] = useValues(0, 0)
  const [selectorVisible, setSelectorVisible] = useState(true)
  const { width: windowWidth } = useDimensions()

  useEffect(() => {
    resetPositionCalculations()
    return () => resetPositionCalculations()
  }, [])

  const animateTransition = useCallback(
    (index, skipAnimation) => {
      const nextWidth = widths[index]
      const nextX = positions[index] + widths[index] / 2

      if (skipAnimation) {
        translateX.setValue(nextX)
        width.setValue(nextWidth)
      } else {
        springTo(translateX, nextX)
        springTo(width, nextWidth)
      }
    },
    [translateX, width]
  )

  const handleItemLayout = useCallback(
    (event, index) => {
      const itemWidth = get(event, "nativeEvent.layout.width", 0)
      const itemX = get(event, "nativeEvent.layout.x", 0)
      setSelectorVisible(true)

      positions[index] = Math.floor(itemX) - Math.floor(itemWidth / 2)
      widths[index] = Math.floor(itemWidth)
      calculatedItemWidths++

      if (items.length === calculatedItemWidths) {
        animateTransition(defaultIndex, true)
      }
    },
    [animateTransition, defaultIndex, items.length]
  )

  const handleItemPress = useCallback(
    (event, index) => {
      animateTransition(index, false)
      setSelected(index)
      onSelect(items[index])
    },
    [animateTransition, items, onSelect]
  )

  return (
    <View {...props}>
      {selectorVisible ? (
        <Animated.View
          style={{
            height,
            marginBottom: height * -1.025,
            zIndex: 10,
            borderRadius: height / 2,
            backgroundColor,
            transform: [{ translateX }],
            width,
          }}
        ></Animated.View>
      ) : null}
      <View
        style={{
          ...tw`flex-row flex items-center justify-evenly px-4`,
          zIndex: 11,
          height: height,
          width: windowWidth * 0.8,
        }}
      >
        {items.map((item, index) => (
          <Pressable
            style={tw`rounded-full p-2 px-3 mx-6`}
            onLayout={event => {
              handleItemLayout(event, index)
            }}
            onPress={event => handleItemPress(event, index)}
            key={index}
          >
            <Text
              style={{
                ...tw`text-center tracking-wider uppercase`,
                color: index === selected ? "#fff" : "#000",
              }}
              // TODO: enableHapticFeedback={enableHapticFeedback}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default magicMemo(TimespanSelector, [
  "backgroundColor",
  "defaultIndex",
  "height",
  "items",
])
