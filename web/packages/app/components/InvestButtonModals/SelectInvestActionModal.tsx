import { useAuth } from "app/hooks/useAuth"
import React, { useState, useEffect } from "react"
import { View, Text, Pressable } from "react-native"
import { Actions } from "./Actions"

import tw from "app/lib/tailwind"

const SelectInvestActionModal = ({ symbol, state, send }) => {
  console.log("in select actionnnnnnnnn")

  const [actionSelected, setActionSelected] = useState(null)

  const setSelectedAction = action => {
    setActionSelected(`Share ${symbol} with a group`)
    send("CHOOSE_SHARE")
  }

  // const setSelectedGroup = (group) => {
  //   console.log(("sendinggroup"));
  //   setGroupSelected(group.name)
  //   send("SELECT_GROUP", { groupName: group.name })
  // }

  return (
    <View style={tw`inline-block w-full  align-middle`}>
      <View style={tw`items-center`}>
        {/** TODO Add a loader here  */}
        {Actions(symbol)?.map(action => (
          <Pressable
            style={tw`inline-block w-4/5 max-w-lg p-2 my-2  text-left align-middle bg-white shadow-md  transform rounded-2xl`}
            onPress={setSelectedAction}
          >
            <Text style={tw`text-xl leading-none text-brand-black`}>{action.name}</Text>
            <Text style={tw`text-sm leading-none text-gray-500`}>
              {action.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectInvestActionModal
