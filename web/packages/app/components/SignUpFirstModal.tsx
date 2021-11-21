import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { CenteredColumn } from "./Centered"
import { Modal, ModalHeader } from "./Modal"
import tw from "app/lib/tailwind"
import React from "react"
import { View } from "react-native"
import { LoginOptions, LoginOptionsButtonType } from "./LoginOptions"

export const SignUpFirstModal: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ modalRef }) => {
  const scrollPositions = ["35%"]
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      defaultPositionIndex={0}
    >
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={"Please sign up first 😏"} />
        <CenteredColumn style={tw`h-full pb-14`}>
          <LoginOptions buttonType={LoginOptionsButtonType.SIGN_IN} />
        </CenteredColumn>
      </View>
    </Modal>
  )
}
