import React from "react"
import { Text, View } from "react-native"
import tw from "app/lib/tailwind"
import Donut from "./DonutChart"
import SkeletonCircle from "./SkeletonCircle"

const CardDonutChart = ({ holdings, sectors, radius, textColor, gain, cashBalance }) =>
  sectors?.length === holdings?.length ? (
    <View style={tw`p-2`}>
      <Donut sectors={sectors} textColor={textColor} />
      <View
        style={[
          tw.style(`flex-col items-center -mt-36 mb-12`, {
            fontSize: radius / 4,
            color: textColor,
          }),
        ]}
      >
        <Text style={tw`text-center text-tiny mt-1 font-poppins-200 uppercase`}>
          portfolio
        </Text>
        <Text style={tw`text-center text-lg`}>{`$${sectors
          .reduce((acc, sector) => acc + sector.value, 0)
          .toFixed(2)}`}</Text>
        <Text
          style={tw.style(
            `text-center text-tiniest font-poppins-200 uppercase`,
            gain > 0 ? "text-teal-500" : gain < 0 ? "text-red-500" : "bg-brand"
          )}
        >
          {gain.toFixed(2)}%
        </Text>
        <View
          style={tw.style(`bg-brand-black my-2 w-8/12`, {
            borderBottomWidth: 0.25,
          })}
        />
        <Text style={tw`text-center text-tiny font-poppins-200 uppercase`}>cash</Text>
        <Text style={tw`text-center text-lg `}>{`$${cashBalance?.toFixed(2)}`}</Text>
      </View>
    </View>
  ) : (
    <View style={tw`my-4`}>
      <SkeletonCircle radius={80} />
    </View>
  )

export default CardDonutChart
