import React, { useState } from "react"
import { View, TouchableOpacity, Text, Dimensions } from "react-native"
import GroupColumn from "../../components/GroupColumnCard"
import tw from "../../lib/tailwind"
import { createParam } from "../../navigation/use-param"
import Feather from "@expo/vector-icons/build/Feather"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

type FeatherIconName = React.ComponentProps<typeof Feather>["name"]

const tabs = [
  {
    name: "Members",
    icon: "users" as FeatherIconName,
  },
  {
    name: "Events",
    icon: "calendar" as FeatherIconName,
  },
  {
    name: "Files",
    icon: "file-text" as FeatherIconName,
  },
  {
    name: "Settings",
    icon: "cog" as FeatherIconName,
  },
]
const { width: WIDTH } = Dimensions.get("window")
const TAB_WIDTH = (WIDTH - 64 - 12) / tabs.length

export default () => {
  const [groupName] = useParam("id")

  return (
    <View style={tw`flex-col m-4`}>
      <GroupColumn groupName={groupName} />
      <Tabs tabs={tabs} />
    </View>
  )
}

interface Tab {
  name: string
  icon?: FeatherIconName
  Component?: React.ComponentType
}

const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={tw`flex-col mx-4`}>
      <TabHeader {...{ index, setIndex }} />
    </View>
  )
}

const Tab = ({
  tab,
  index,
  selected,
  setIndex,
}: {
  tab: Tab
  index: number
  selected: boolean
  setIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { name, icon, Component } = tab
  const Icon = () => <Feather size={24} name={icon} color={"black"} />
  return (
    <TouchableOpacity
      style={tw.style(
        `flex-col items-center justify-center rounded-xl ${
          selected ? "bg-white" : null
        } p-3`,
        {
          width: TAB_WIDTH,
        }
      )}
      onPress={() => setIndex(index)}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={selected ? tw`text-brand` : tw`text-brand-black/50`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}

const TabHeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={tw`flex-row justify-between bg-gray-300/20 p-1 rounded-2xl`}>
      {children}
    </View>
  )
}

const TabHeader = ({
  index,
  setIndex,
}: {
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
}) => (
  <TabHeaderContainer>
    {tabs.map((tab, i) => (
      <Tab key={i} tab={tab} index={i} selected={index === i} setIndex={setIndex} />
    ))}
  </TabHeaderContainer>
)
