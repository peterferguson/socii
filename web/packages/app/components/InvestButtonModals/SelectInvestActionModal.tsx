
import { useAuth } from "../../hooks/useAuth"
import React, { useState, useEffect } from "react"
import { View, Text, Pressable } from "react-native"
import { Actions } from "./Actions"

import tw from "../../lib/tailwind"

const SelectInvestActionModal = () => {
  console.log("in select actionnnnnnnnn");

  const [actionSelected, setActionSelected] = useState(null)

  // const setSelectedAction = (action: { name: string; actionName: string }) => {
  //   send(action.actionName)
  //   setActionSelected(action.name)
  // }
  // const setSelectedGroup = (group) => {
  //   console.log(("sendinggroup"));
  //   setGroupSelected(group.name)
  //   send("SELECT_GROUP", { groupName: group.name })
  // }


  return (
    <View style={tw`inline-block w-full overflow-y-scroll align-middle`}>
      <Text style={tw`text-lg text-center font-bold text-brand pb-2`}>Select an action:</Text>
      <View style={tw`items-center`}>
        {/** TODO Add a loader here  */}
        {Actions("T")?.map((action)=>(
          <Pressable 
            style={tw`inline-block w-4/5 max-w-lg p-2 my-2 overflow-y-scroll text-left align-middle bg-white shadow-md  transform rounded-2xl`}
            onPress={()=>{console.log("hi")}}
          >
                      
              <Text style={tw`text-xl leading-none text-brand-black`}>{action.name}</Text>
              <Text  style={tw`text-sm leading-none text-gray-500`}>{action.description}</Text>            
            
          </Pressable>
        ))}
        
      </View>
    </View>
  )
}

export default SelectInvestActionModal
