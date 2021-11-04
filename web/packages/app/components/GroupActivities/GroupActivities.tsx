// import { NTAActivityCard } from "@components/Activities/NTAActivityCard"
import React, { useEffect, useMemo } from "react"
import { FlatList, Text, View } from "react-native"
import { TradeActivityCard } from "../../components/Activities/TradeActivityCard"
import { useGroupTrades } from "../../hooks/useGroupTrades"
import { GroupTradeItem } from "../../lib/firebase/client/db/getGroupTradeHistory"
import tw from "../../lib/tailwind"
import { Panels, Tabs } from "../Tabs/Tabs"
import { activityTypeMapping } from "./constants"

interface PanelData {
  [label: string]: {
    activities: GroupTradeItem[]
    // PanelComponent: React.FC<{
    //   label: string
    //   activities: GroupTradeItem[]
    // }>
  }
}

const tabs = [{ label: "Trades" }, { label: "Cash" }, { label: "General" }]

export default ({ groupName }: { groupName: string }) => {
  const { activities } = useGroupTrades(groupName)

  const [panelData, setPanelData] = React.useState<PanelData>(
    tabs.reduce(
      (acc, tab) => ({
        ...acc,
        [tab.label]: { activities: [] },
      }),
      {}
    )
  )

  useEffect(() => {
    activities.length &&
      setPanelData((prev) => {
        const filtered = Object.keys(prev).reduce((acc, label) => {
          activities.filter((activity) => {
            if (
              activityTypeMapping[label].includes(activity.executionStatus) &&
              !prev[label].activities
                .map(({ messageId }) => messageId)
                .includes(activity.messageId)
            ) {
              prev[label].activities.push(activity)
            }
          })

          return acc
        }, {})
        return { ...prev, ...filtered }
      })
  }, [activities])

  const panelComponents = useMemo<Panels>(
    () =>
      Object.entries(panelData).reduce(
        (acc, [label, { activities }]) => ({
          ...acc,
          [label]: () => <GroupActivityPanel label={label} activities={activities} />,
        }),
        {}
      ),
    [panelData]
  )

  return <Tabs tabs={tabs} panelComponents={panelComponents} />
}

const GroupActivityPanel = ({
  label,
  activities,
}: {
  label: string
  activities: GroupTradeItem[]
}) => {
  return activities?.length ? (
    <FlatList
      data={activities}
      keyExtractor={(activity) => activity.messageId}
      renderItem={({ item: activity }) => (
        <PanelActivityCard activity={activity} label={label} />
      )}
    />
  ) : (
    <NothingToShow />
  )
}
const PanelActivityCard: React.FC<{ activity: GroupTradeItem; label: string }> = ({
  activity,
  label,
}) => {
  return activity && label === "Trades" ? (
    <TradeActivityCard
      symbol={activity.symbol}
      qty={activity.notional / activity.stockPrice}
      price={activity.stockPrice}
      // @ts-ignore
      isin={activity.assetRef.split("/").pop()}
      messageId={activity.messageId}
      executionStatus={activity.executionStatus}
      side={activity.side}
      notional={activity.notional}
      timestamp={activity.timestamp}
    />
  ) : null
  // return (activity && label === "Trades") || activity?.activityType === "JNLS" ? (
  //   <TradeActivityCard activity={activity} />
  // ) : (
  //   <NTAActivityCard activity={activity} />
  // )
}

const NothingToShow: React.FC = () => (
  <View style={tw`flex-1 items-center justify-center p-3 rounded-xl`}>
    <Text style={tw`text-center `}>Nothing to show here yet</Text>
  </View>
)
