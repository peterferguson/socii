import { BottomSheetModal } from "@gorhom/bottom-sheet"
import tw from "app/lib/tailwind"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { CenteredColumn, CenteredRow, Modal } from "."
import HeaderTitle from "./Headers/HeaderTitle"

export interface SelectorOption {
  label: string
  description: string
  icon: React.FC<{}>
}

interface SelectorModalProps {
  modalRef: React.MutableRefObject<BottomSheetModal>
  title: string
  options: SelectorOption[]
  scrollPositions?: `${number}%`[]
  onOptionPress?: (option: SelectorOption) => void
}

const SelectorModal: React.FC<SelectorModalProps> = ({
  modalRef,
  title,
  options,
  onOptionPress,
  scrollPositions = ["45%"],
}) => {
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      defaultPositionIndex={0}
    >
      <CenteredColumn style={tw`m-2`}>
        <HeaderTitle headerTitle={title} />
        {options.map((option, index) => (
          <Pressable
            key={`selector-option-${index}`}
            style={tw`items-start p-4`}
            onPress={() => onOptionPress(option)}
          >
            <CenteredRow>
              <View style={tw`ml-6 p-4 items-start`}>
                <option.icon />
              </View>
              <CenteredColumn style={tw`p-1 items-start w-11/12`}>
                <Text style={tw`text-lg font-bold text-gray-900`}>{option.label}</Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={2}
                  style={tw`text-sm text-gray-600`}
                >
                  {option.description}
                </Text>
              </CenteredColumn>
            </CenteredRow>
          </Pressable>
        ))}
      </CenteredColumn>
    </Modal>
  )
}

export default SelectorModal
