import React, { useRef, useEffect } from "react"
import { View } from "react-native"
import tw from "../../lib/tailwind"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import { getYForX, Vector, Path } from "react-native-redash"
import { usePrevious } from "../../hooks/usePrevious"

const CURSOR = 12

interface CursorProps {
  path: Path
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
}

const Cursor = ({ path, translation, logoColor }: CursorProps) => {
  const isActive = useSharedValue(false)
  const previousY = useRef(0)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true
    },
    onActive: (event) => {
      if (event.x <= 0) {
        translation.x.value = 0
        translation.y.value = previousY.current
      } else {
        translation.x.value = event.x
        translation.y.value = getYForX(path, translation.x.value)
        previousY.current = translation.y.value
      }
    },
    onEnd: () => {
      isActive.value = false
    },
  })

  useEffect(() => {
    previousY.current = translation.y.value
  }, [translation.y.value])

  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - CURSOR / 2
    const translateY = translation.y.value - CURSOR / 2
    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(isActive.value ? 1 : 0) },
      ],
    }
  })

  return (
    <View style={tw`absolute inset-0`}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={tw`absolute inset-0`}>
          <Animated.View
            style={[
              {
                ...tw`items-center justify-center rounded-full`,
                backgroundColor: logoColor,
                width: CURSOR,
                height: CURSOR,
              },
              style,
            ]}
          >
            <View
              style={{
                ...tw`rounded-full h-8 w-8 opacity-30`,
                backgroundColor: logoColor,
              }}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default Cursor
