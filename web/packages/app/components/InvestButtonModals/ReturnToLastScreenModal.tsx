import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"

const ReturnToLastScreenModal = ({ send }) => (
  <View style={tw`inline-block w-full  align-middle`}>
    <View style={tw`flex items-center justify-center `}>
      <Pressable
        style={tw`w-1/2 max-w-lg p-4 my-2  text-left align-middle bg-white shadow-md  transform rounded-2xl`}
        onPress={() => send("DISAGREE")}
      >
        <Text>No, start over!</Text>
      </Pressable>
      <Pressable
        style={tw`inline-block w-4/5 max-w-lg p-4 my-2  text-left align-middle bg-white shadow-md  transform rounded-2xl`}
        onPress={() => send("AGREE")}
      >
        <Text>Yes, continue</Text>
      </Pressable>
    </View>
  </View>
)
// TODO does memo have an effect here?
export default React.memo(ReturnToLastScreenModal)
