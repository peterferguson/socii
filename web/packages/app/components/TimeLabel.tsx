import React from "react"
import { View } from "react-native"
import Animated, { useDerivedValue } from "react-native-reanimated"
import { ReText } from "react-native-redash"
import tw from "app/lib/tailwind"

// - Modified from here ↓↓↓
//  - https://github.com/rainbow-me/rainbow/blob/733373ff33975fc0d2e2ad00db6d3b868da4ff4b/src/components/expanded-state/chart/chart-data-labels/ChartDateLabel.js

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function formatTimestamp(chartTimeSharedValue: Animated.SharedValue<number>) {
  "worklet"
  // we have to do it manually due to limitations of reanimated

  const date = new Date(chartTimeSharedValue.value * 1000)
  const now = new Date()

  let res = MONTHS[date.getMonth()] + " "

  const d = date.getDate()
  if (d < 10) {
    res += "0"
  }
  res += d

  const y = date.getFullYear()
  const yCurrent = now.getFullYear()
  if (y !== yCurrent) {
    res += ", " + y
    return res
  }

  const h = date.getHours() % 12
  if (h === 0) {
    res += " 12:"
  } else {
    if (h < 10 && date.getHours() < 12) {
      res += " 0" + h + ":"
    } else {
      res += " " + h + ":"
    }
  }

  const m = date.getMinutes()
  if (m < 10) {
    res += "0"
  }
  res += m + " "

  if (date.getHours() < 12) {
    res += "AM"
  } else {
    res += "PM"
  }

  return res
}

const TimeLabel = ({ style = tw`text-gray-400 text-tiny`, chartTimeSharedValue }) => {
  const formattedValue = useDerivedValue(() => formatTimestamp(chartTimeSharedValue))
  return (
    <View style={tw`-mt-3 pl-1`}>
      <ReText
        style={style}
        text={(formattedValue || null) as Animated.SharedValue<string>}
      />
    </View>
  )
}

export default TimeLabel
