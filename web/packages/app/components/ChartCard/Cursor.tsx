import React from "react"
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

const CURSOR = 50

interface CursorProps {
  path: Path
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
}

const Cursor = ({ path, translation, logoColor }: CursorProps) => {
  const isActive = useSharedValue(false)
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true
    },
    onActive: (event) => {
      translation.x.value = event.x
      translation.y.value = getYForX(path, translation.x.value) || 0
    },
    onEnd: () => {
      isActive.value = false
    },
  })

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
                ...tw`opacity-10 items-center justify-center rounded-full`,
                backgroundColor: logoColor,
                width: CURSOR,
                height: CURSOR,
              },
              style,
            ]}
          >
            <View style={{ ...tw`h-4 w-4 rounded-full`, backgroundColor: logoColor }} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

export default Cursor
