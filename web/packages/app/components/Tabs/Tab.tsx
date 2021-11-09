import React from "react"
import { Text, TouchableOpacity } from "react-native"
import tw from "app/lib/tailwind"

export interface Tab {
  label: string
}

export const Tab = ({
  tab,
  index,
  width,
  selected,
  setIndex,
}: {
  tab: Tab
  index: number
  width: number
  selected: boolean
  setIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { label } = tab
  return (
    <TouchableOpacity
      style={tw.style(
        `flex-col items-center justify-center rounded-xl ${
          selected ? "bg-white" : null
        } p-3`,
        { width }
      )}
      onPress={() => setIndex(index)}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={tw.style(
          `${selected ? "text-brand" : "text-brand-black/50"} font-poppins-400`
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
