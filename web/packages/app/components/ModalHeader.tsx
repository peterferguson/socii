import { Add } from "iconsax-react-native"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { useModal } from "../hooks/useModal"
import tw from "../lib/tailwind"

const ModalHeader = ({ modalRef, label }) => {
  const { handleDismiss } = useModal(modalRef)
  return (
    <>
      <View style={tw`flex-row items-center justify-between w-11/12`}>
        <Text style={tw`font-poppins-600 text-lg text-brand-black dark:text-brand-gray`}>
          {label}
        </Text>
        <Pressable onPress={handleDismiss}>
          <Add
            size="24"
            color={tw.color("brand-black")}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
        </Pressable>
      </View>
      <View
        style={tw.style(`border-brand-black/20 pt-2 w-full h-1`, {
          borderBottomWidth: 0.5,
        })}
      />
    </>
  )
}

export default ModalHeader
