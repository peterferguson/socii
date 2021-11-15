import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"
import { OrderTypes } from "./OrderTypes"

const SelectOrderTypeModal = ({ symbol, state, send }) => {

  const setSelectedOrderType = (order) => {
    send(order.actionName)
  }

  return (
    <View style={tw`inline-block w-full align-middle`}>
      <View style={tw`items-center h-full`}>
        {/** TODO Add a loader here  */}
        {OrderTypes(symbol, state.context.side)?.map(order => (
          <Pressable
            style={tw`inline-block w-4/5 max-w-lg p-4 my-2 overflow-y-scroll text-left align-middle bg-white shadow-md  transform rounded-2xl`}
            onPress={()=>{setSelectedOrderType(order)}}
          >
            <View style={tw`flex flex-row`}>
              <View style={tw`flex justify-center`}>
                <order.icon/>
              </View>  
              <View  style={tw`flex flex-col justify-center pl-2 w-11/12`} >                
                <Text style={tw`flex flex-wrap text-lg leading-none text-brand-black`}>
                  {order.name}
                </Text>
                <Text style={tw`text-xs leading-none text-gray-500 pt-1`}>
                  {order.description}
                </Text>  
              </View>
            </View> 
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectOrderTypeModal
