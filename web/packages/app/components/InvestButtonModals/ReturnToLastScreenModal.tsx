import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "app/lib/tailwind"
import { ArrowRotateRight, DocumentForward } from "iconsax-react-native"
import { CenteredColumn } from "../Centered"
import ModalSelectButton from "./ModalSelectButton"

const returnActions = send => [
  {
    onPress: () => send("AGREE"),
    label: "Continue where you left off?",
    Icon: () => (
      <View style={tw`flex justify-center p-2 rounded-full bg-pink-200`}>
        <ArrowRotateRight size={25} variant="Outline" />
      </View>
    ),
    description: "Returns you to the last section you got to.",
  },
  {
    onPress: () => send("DISAGREE"),
    label: "No, start over!",
    Icon: () => (
      <View style={tw`flex justify-center p-2 rounded-full bg-brand-lightTeal`}>
        <DocumentForward size={25} variant="Outline" />
      </View>
    ),
    description: "Begin with a new form",
  },
]

const ReturnToLastScreenModal = ({ send }) => (
  <CenteredColumn style={tw`justify-evenly w-full p-4 absolute top-0`}>
    {/** TODO Add a loader here  */}
    {returnActions(send)?.map(action => (
      <ModalSelectButton
        onPress={action.onPress}
        Icon={action.Icon}
        title={action.label}
        key={action.label}
        description={action.description}
      />
    ))}
  </CenteredColumn>
)
// TODO does memo have an effect here?
export default React.memo(ReturnToLastScreenModal)
