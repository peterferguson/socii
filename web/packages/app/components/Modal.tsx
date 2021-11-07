import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useMemo } from "react"
import { View } from "react-native"
import tw from "../lib/tailwind"

// - This is intended to wrap a react navigation Navigator.
export default ({
  children,
  modalRef,
  detach,
  onChange = () => {},
  snapToPositions = ["25%", "50%", "90%"],
}: {
  children: React.ReactNode
  modalRef: React.RefObject<BottomSheetModal>
  detach?: boolean
  onChange?: (index: number) => void
  snapToPositions?: string[]
}) => {
  const snapPoints = useMemo(() => snapToPositions, [])

  return (
    <View style={tw`flex-1 p-6`}>
      <BottomSheetModal
        ref={modalRef}
        index={1}
        detached={detach}
        snapPoints={snapPoints}
        onChange={onChange}
      >
        {children}
      </BottomSheetModal>
    </View>
  )
}
