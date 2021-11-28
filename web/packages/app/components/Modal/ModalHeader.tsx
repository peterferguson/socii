import { useModal } from "app/hooks/useModal"
import tw from "app/lib/tailwind"
import { Add } from "iconsax-react-native"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { CenteredRow } from "../Centered"

const ModalHeader = ({ modalRef, label = null, LabelComponent = null }) => {
  const { handleDismiss } = useModal(modalRef)
  return (
    <>
      <CenteredRow>
        <View style={tw`flex-7 mx-3`}>
          {LabelComponent ? (
            <LabelComponent />
          ) : (
            <Text
              style={tw`font-poppins-600 text-lg text-brand-black dark:text-brand-gray`}
              numberOfLines={2}
              adjustsFontSizeToFit
            >
              {label}
            </Text>
          )}
        </View>
        <View style={tw`flex-1`}>
          <Pressable onPress={handleDismiss}>
            <Add
              size="24"
              color={tw.color("brand-black")}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </Pressable>
        </View>
      </CenteredRow>
      <View
        style={tw.style(`border-brand-black/20 pt-2 w-full h-1`, {
          borderBottomWidth: 0.5,
        })}
      />
    </>
  )
}

export default ModalHeader
