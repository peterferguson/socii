import { useAuth } from "app/hooks/useAuth"
import React, { useState, useEffect } from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ symbol, state, send }) => {
  const [orderTypeSelected, setOrderTypeSelected] = useState(null)

  const setSelectedOrderType = order => {
    send(order.actionName)
    setOrderTypeSelected(order.name)
  }

  return (
    <View style={tw`inline-block w-full  align-middle`}>
      <View style={tw`items-center`}>
        {/** TODO Add a loader here  */}
        {OrderTypes(symbol, state.context.side)?.map(orderType => (
          <Pressable
            style={tw`inline-block w-4/5 max-w-lg p-4 my-2  text-left align-middle bg-white shadow-md  transform rounded-2xl`}
            onPress={setSelectedOrderType}
          >
            <View>
              <Text style={tw`text-xl`}>{orderType.name}</Text>
              <Text>{orderType.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectOrderTypeModal
