import React, { useCallback } from "react"
import BottomSheetModal from "@gorhom/bottom-sheet"

export const useModal = (bottomSheetRef: React.MutableRefObject<BottomSheetModal>) => {
  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current?.collapse()
  }, [])
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])
  const handlePresent = useCallback(() => {
    // ? Not sure why this throws an error ... it works fine
    // ? .expand() doesn't throw an error but doesnt work
    // @ts-ignore
    bottomSheetRef.current?.present()
  }, [])

  return {
    handleSnapPress,
    handleCollapsePress,
    handleClosePress,
    handlePresent,
  }
}
