import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useCallback } from "react"

export const useModal = (bottomSheetRef: React.MutableRefObject<BottomSheetModal>) => {
  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse()
  }, [])
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])
  const handleDismiss = useCallback(() => {
    bottomSheetRef.current?.dismiss()
  }, [])
  const handlePresent = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])
  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [])

  return {
    handleSnapPress,
    handleCollapsePress,
    handleDismiss,
    handleClose,
    handlePresent,
    handleExpand,
  }
}
