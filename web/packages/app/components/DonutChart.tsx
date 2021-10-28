import { useEffect, useRef } from "react"
import { View } from "react-native"
import Svg, { G, Path } from "react-native-svg"
import tw from "../lib/tailwind"

export interface DonutSector {
  symbol: string
  color: string
  value: number
}

interface IDonutProps {
  sectors: DonutSector[]
  radius?: number
  strokeWidth?: number
  duration?: number
  delay?: number
  textColor?: string
}

// const AnimatedPath = Animated.createAnimatedComponent(Path)
const { PI, cos, sin } = Math
const separationAngle = PI * 0.04

export default function Donut({
  sectors,
  radius = 80,
  strokeWidth = 10,
  duration = 500,
  delay = 0,
  textColor = tw.color("brand"),
}: IDonutProps) {
  const size = radius * 2 + strokeWidth
  const total = sectors.reduce((acc, sector) => acc + sector.value, 0)
  const prevAngleInRadians = useRef(0)

  useEffect(
    () => () => {
      prevAngleInRadians.current = 0
    },
    []
  )

  return (
    <View style={{ width: size, height: size }}>
      <Svg height={size} width={size}>
        <G>
          {sectors
            .sort(({ value: a }, { value: b }) => b - a)
            .map((sector, index, array) => {
              const fraction = sector.value / total

              return (
                <CircleArc
                  key={`segment-${index}`}
                  {...{
                    radius,
                    fraction,
                    prevAngleInRadians,
                    strokeWidth,
                    origin: size,
                    // color: sector.color,
                    color: getInwardAlternatingColors(index),
                  }}
                />
              )
            })}
        </G>
      </Svg>
    </View>
  )
}

const CircleArc = ({
  origin,
  prevAngleInRadians,
  radius,
  color,
  strokeWidth,
  fraction,
}) => {
  const cx = origin / 2
  const cy = origin / 2

  const startAngle = prevAngleInRadians.current
  const endAngle = startAngle + fraction * 2 * PI - separationAngle
  prevAngleInRadians.current = endAngle + separationAngle

  const d = describeArc(cx, cy, radius, startAngle, endAngle)

  return (
    <Path stroke={color} strokeLinecap="round" fill="none" {...{ d, strokeWidth }} />
  )
}

const polarToCartesian = (centerX, centerY, radius, angleInRadians) => ({
  x: centerX + radius * cos(angleInRadians),
  y: centerY + radius * sin(angleInRadians),
})

const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= PI ? "0" : "1"

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ")

  return d
}

// TODO: Need to add more colors / better color palette
const colors = [
  "#ff72b4", // - brand pink
  "#d38be5",
  "#c592ed",
  "#b598f4",
  "#a59ef9",
  "#94a4fb",
  "#3fbaeb", // - brand color
]

const getInwardAlternatingColors = (index) => {
  // * 0, -1, 1, -2, 2, ...
  const ordinal = 0.25 * (-1 + (1 - 2 * (index + 1)) * (-1) ** (index + 1))
  return colors.slice(ordinal)[0]
}
