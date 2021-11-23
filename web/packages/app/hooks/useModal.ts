import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useCallback } from "react"
import { useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const useModal = (bottomSheetRef: React.MutableRefObject<BottomSheetModal>) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions()
  const { top: SAFE_AREA_TOP } = useSafeAreaInsets()

  const FULL_HEIGHT_SNAP_POINT = `${
    (100 * (SCREEN_HEIGHT - SAFE_AREA_TOP)) / SCREEN_HEIGHT
  }%`

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index)
  }, [])
  const handleSnapPosition = useCallback(position => {
    bottomSheetRef.current?.snapToPosition(position)
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
    FULL_HEIGHT_SNAP_POINT,
    handleSnapPress,
    handleSnapPosition,
    handleCollapsePress,
    handleDismiss,
    handleClose,
    handlePresent,
    handleExpand,
  }
}
