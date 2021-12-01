import { LoginOptions, LoginOptionsButtonType } from "app/components/LoginOptions"
import tw from "app/lib/tailwind"
import { ArrowRight } from "iconsax-react-native"
import { MotiView } from "moti"
import React from "react"
import { TouchableOpacity, View, Platform } from "react-native"
import Animated, { useAnimatedProps } from "react-native-reanimated"
import { Circle, G, Svg } from "react-native-svg"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const BUTTON_SIZE = 64
const strokeWidth = 2
const center = BUTTON_SIZE / 2
const radius = center - strokeWidth / 2
const circumference = 2 * Math.PI * radius

const NextButton = ({
  progress,
  progressAnimationComplete,
  scrollToNext,
}: {
  progress: Animated.SharedValue<number>
  progressAnimationComplete: boolean
  scrollToNext: () => void
}) => {
  const progressAnimation = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * progress.value) / 100,
  }))

  return !progressAnimationComplete ? (
    <View>
      <Svg width={BUTTON_SIZE} height={BUTTON_SIZE}>
        <G rotation={"-90"} origin={center}>
          <Circle
            stroke={tw.color("gray-300")}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            animatedProps={progressAnimation}
            stroke={tw.color("brand")}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        style={tw`absolute p-4`}
        onPress={scrollToNext}
        activeOpacity={0.6}
      >
        <ArrowRight size="32" color={tw.color("brand")} />
      </TouchableOpacity>
    </View>
  ) : (
    <MotiView
      style={tw`flex flex-col w-full -mt-6 items-center justify-center rounded-full mx-auto`}
      from={Platform.select({
        ios: { opacity: 0, width: "0%", translateX: "100%" },
        android: { opacity: 0 },
      })}
      animate={Platform.select({
        ios: { opacity: 1, width: "100%", translateX: "0%" },
        android: { opacity: 1 },
      })}
    >
      <LoginOptions buttonType={LoginOptionsButtonType.SIGN_UP} />
    </MotiView>
  )
}

export default NextButton
