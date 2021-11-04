import { ActivityItem } from "alpaca"
import { View, Text } from "react-native"
import tw from "../../lib/tailwind"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import React from "react"
import Feather from "@expo/vector-icons/build/Feather"
// import { FaHome } from "react-icons/fa"
// import { BsPeopleFill } from "react-icons/bs"
dayjs.extend(calendar)

const NTAActivityMapping: { [key: string]: string } = {
  ACATC: "ACATS IN/OUT (Cash)",
  ACATS: "ACATS IN/OUT (Securities)",
  CSD: "Deposit",
  CSR: "Cash receipt (-)",
  CSW: "Cash withdrawable",
  DIV: "Dividend",
  DIVCGL: "Dividend (capital gain long term)",
  DIVCGS: "Dividend (capital gain short term)",
  DIVNRA: "Dividend adjusted (NRA Withheld)",
  DIVROC: "Dividend return of capital",
  DIVTXEX: "Dividend (tax exempt)",
  INT: "Interest (credit/margin)",
  JNLC: "Journal entry (cash)",
  JNLS: "Journal entry (stock)",
  MA: "Merger/Acquisition",
  NC: "Name change",
  PTC: "Pass thru change",
  REORG: "Reorg CA",
  SSO: "Stock spinoff",
  SSP: "Stock split",
}

export const NTAActivityCard = ({ activity }: { activity: ActivityItem }) => (
  <View
    key={activity.id}
    style={tw`relative flex items-center p-3 rounded-xl hover:bg-gray-5`}
  >
    <View
      style={tw`flex items-center justify-center w-10 h-10 text-white rounded-full shadow-lg bg-gradient-to-br from-brand-pink to-brand`}
    >
      {activity.status?.toLowerCase() !== "queued" ? (
        <Feather name="home" size={20} />
      ) : (
        <Feather name="user" size={20} />
      )}
    </View>

    <View style={tw`ml-4 hover:bg-gray-50`}>
      <Text style={tw`font-medium text-gray-500 capitalize text-tiniest leading-5`}>
        {activity.status}
      </Text>
      <Text style={tw`text-sm font-medium capitalize leading-5`}>
        {NTAActivityMapping[activity.activityType] || activity.activityType}
      </Text>

      <View style={tw`flex mt-1`}>
        <Text style={tw`text-gray-500 text-tiny`}>
          {dayjs(activity.date).calendar()}
        </Text>
        {activity.description && (
          <Text style={tw`text-tiniest`} numberOfLines={1} adjustsFontSizeToFit>
            &middot; {activity.description}
          </Text>
        )}
      </View>
    </View>
    <Text
      style={tw.style(
        "absolute right-0 mr-4 text-sm flex flex-col justify-center text-center"
      )}
    >
      ${activity.netAmount}
    </Text>
  </View>
)
