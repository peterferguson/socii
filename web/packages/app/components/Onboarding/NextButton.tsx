import tw from "app/lib/tailwind"
import { View, TouchableOpacity } from "react-native"
import Animated, { useAnimatedProps } from "react-native-reanimated"
import { ArrowRight } from "iconsax-react-native"
import { Svg, G, Circle } from "react-native-svg"

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const BUTTON_SIZE = 64
const strokeWidth = 2
const center = BUTTON_SIZE / 2
const radius = center - strokeWidth / 2
const circumference = 2 * Math.PI * radius

const NextButton = ({ progress }: { progress: Animated.SharedValue<number> }) => {
  const progressAnimation = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * progress.value) / 100,
  }))
  return (
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
      <TouchableOpacity style={tw`absolute p-4`} onPress={() => {}} activeOpacity={0.6}>
        <ArrowRight size="32" color={tw.color("brand")} />
      </TouchableOpacity>
    </View>
  )
}

export default NextButton
