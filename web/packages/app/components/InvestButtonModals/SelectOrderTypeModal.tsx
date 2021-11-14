import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ symbol, state, send }) => {

  const setSelectedOrderType = (order) => {
    send(order.actionName)
  }

  return (
    <View style={tw`inline-block w-full overflow-y-scroll align-middle`}>
      <View style={tw`items-center`}>
        {/** TODO Add a loader here  */}
        {OrderTypes(symbol, state.context.side)?.map(order => (
          <Pressable
            style={tw`inline-block w-4/5 max-w-lg p-4 my-2 overflow-y-scroll text-left align-middle bg-white shadow-md  transform rounded-2xl`}
            onPress={()=>{setSelectedOrderType(order)}}
          >
            <View>
              <Text style={tw`text-xl`}>{order.name}</Text>
              <Text>{order.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectOrderTypeModal
