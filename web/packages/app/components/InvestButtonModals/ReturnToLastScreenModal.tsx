import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"
import { ArrowRotateRight, DocumentForward } from "iconsax-react-native"

const ReturnToLastScreenModal = ({ send }) => (
  <View style={tw`inline-block w-full align-middle h-full`}>
    <View style={tw`flex items-center justify-center `}>
      <Pressable
        style={tw`w-4/5 p-4 my-2 bg-white shadow-md transform rounded-2xl`}
        onPress={() => send("DISAGREE")}
      >
        <View style={tw`flex flex-row`}>
          <View style={tw`flex justify-center p-2 rounded-full bg-pink-200`}>
            <ArrowRotateRight size={25} variant="Outline" />
          </View>
          <View style={tw`flex flex-col justify-center pl-2 w-11/12`}>
            <Text style={tw`flex flex-wrap text-lg leading-none text-brand-black`}>
              No, start over!
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={tw`inline-block w-4/5 p-4 my-2 bg-white shadow-md transform rounded-2xl`}
        onPress={() => send("AGREE")}
      >
        <View style={tw`flex flex-row`}>
          <View style={tw`flex justify-center p-2 rounded-full bg-brand-lightTeal`}>
            <DocumentForward size={25} variant="Outline" />
          </View>
          <View style={tw`flex flex-col justify-center pl-2 w-11/12`}>
            <Text style={tw`flex flex-wrap text-lg leading-none text-brand-black`}>
              Yes, continue
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  </View>
)
// TODO does memo have an effect here?
export default React.memo(ReturnToLastScreenModal)
