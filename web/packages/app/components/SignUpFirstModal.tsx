import { BottomSheetModal } from "@gorhom/bottom-sheet"
import tw from "app/lib/tailwind"
import React from "react"
import { View } from "react-native"
import { CenteredColumn } from "./Centered"
import { useAuth, useModal } from "app/hooks"
import { LoginOptions, LoginOptionsButtonType } from "./LoginOptions"
import { Modal, ModalBackdrop, ModalHeader } from "./Modal"

export const SignUpFirstModal: React.FC<{
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ modalRef }) => {
  const scrollPositions = ["35%"]
  const { user } = useAuth()
  const { handleClose } = useModal(modalRef)

  React.useEffect(() => user && handleClose(), [user, handleClose])

  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      backdropComponent={ModalBackdrop}
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
