import { BottomSheetModal, BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import React, { useMemo } from "react"
import { View, ViewStyle } from "react-native"
import tw from "app/lib/tailwind"

// TODO: refactor props to extend from BottomSheetModal
// - This is intended to wrap a react navigation Navigator.
export default ({
  children,
  modalRef,
  detach,
  bottomInset,
  containerStyle,
  modalStyle,
  backdropComponent,
  defaultPositionIndex = 1,
  onChange = () => {},
  snapToPositions = ["25%", "50%", "90%"],
}: {
  children: React.ReactNode
  modalRef: React.RefObject<BottomSheetModal>
  detach?: boolean
  bottomInset?: number
  containerStyle?: ViewStyle
  backdropComponent?: React.FC<BottomSheetBackdropProps>
  modalStyle?: ViewStyle
  defaultPositionIndex?: number
  onChange?: (index: number) => void
  snapToPositions?: string[]
}) => {
  const snapPoints = useMemo(() => snapToPositions, [])

  return (
    <View style={[tw`absolute bottom-0 flex-1 p-6`, containerStyle]}>
      <BottomSheetModal
        ref={modalRef}
        backdropComponent={backdropComponent}
        bottomInset={bottomInset}
        index={defaultPositionIndex}
        detached={detach}
        snapPoints={snapPoints}
        onChange={onChange}
        style={modalStyle}
      >
        {children}
      </BottomSheetModal>
    </View>
  )
}
