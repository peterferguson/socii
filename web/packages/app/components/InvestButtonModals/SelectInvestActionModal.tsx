import tw from "app/lib/tailwind"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { Actions } from "./Actions"

const SelectInvestActionModal = ({ symbol, state, send }) => {
  const setSelectedAction = (action: { name: string; actionName: string }) =>
    send(action.actionName)

  const actions = Actions(symbol).filter(k =>
    !state.context.hasHolding ? k.name.match(/Buy|Share/) : true
  )

  return (
    <View style={tw`inline-block w-full align-middle`}>
      <View style={tw`items-center h-full`}>
        {/** TODO Add a loader here  */}
        {actions?.map(action => (
          <Pressable
            style={tw`inline-block w-10/12 max-w-lg p-2 my-2 align-middle bg-white shadow-md transform rounded-2xl`}
            onPress={() => setSelectedAction(action)}
          >
            <View style={tw`flex flex-row`}>
              <View style={tw`flex justify-center`}>
                <action.icon />
              </View>
              <View style={tw`flex flex-col justify-center pl-2`}>
                <Text style={tw`text-xl leading-none text-brand-black`}>
                  {action.name}
                </Text>
                <Text style={tw`text-xs text-left leading-none text-gray-500 pt-1`}>
                  {action.description}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectInvestActionModal
