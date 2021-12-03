import React, { useEffect, useState } from "react"
import { BackHandler, StyleSheet, useWindowDimensions, ViewStyle } from "react-native"
import { BlurView } from "expo-blur"
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import {
  ChatOverlayContext,
  ChatOverlayContextValue,
  BlurTint,
} from "./ChatOverlayContext"

import { BottomSheetOverlay } from "../BottomSheetOverlay"
import { ChannelInfoOverlay } from "../ChannelInfoOverlay"
import { UserInfoOverlay } from "../UserInfoOverlay"
import { BottomSheetOverlayProvider } from "./BottomSheetOverlayContext"
import { ChannelInfoOverlayProvider } from "./ChannelInfoOverlayContext"
import { UserInfoOverlayProvider } from "./UserInfoOverlayContext"

export const ChatOverlayProvider: React.FC<{
  value?: Partial<ChatOverlayContextValue>
}> = props => {
  const { children, value } = props

  const [blurTint, setBlurTint] = useState<BlurTint>()
  const [overlay, setOverlay] = useState(value?.overlay || "none")

  const overlayOpacity = useSharedValue(0)
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    const backAction = () => {
      if (overlay !== "none") {
        setBlurTint(undefined)
        setOverlay("none")
        return true
      }

      return false
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => backHandler.remove()
  }, [overlay])

  useEffect(() => {
    cancelAnimation(overlayOpacity)
    if (overlay !== "none") {
      overlayOpacity.value = withTiming(1)
    } else {
      overlayOpacity.value = withTiming(0)
    }
  }, [overlay])

  const overlayStyle = useAnimatedStyle<ViewStyle>(
    () => ({
      opacity: overlayOpacity.value,
    }),
    []
  )

  const overlayContext = {
    overlay,
    setOverlay,
  }

  return (
    <ChatOverlayContext.Provider value={overlayContext}>
      <BottomSheetOverlayProvider>
        <ChannelInfoOverlayProvider>
          <UserInfoOverlayProvider>
            {children}
            <Animated.View
              pointerEvents={overlay === "none" ? "none" : "auto"}
              style={[StyleSheet.absoluteFill, overlayStyle]}
            >
              <BlurView
                tint={blurTint}
                style={[StyleSheet.absoluteFill, { height, width }]}
              />
            </Animated.View>
            <UserInfoOverlay
              overlayOpacity={overlayOpacity}
              visible={overlay === "userInfo"}
            />
            <ChannelInfoOverlay
              overlayOpacity={overlayOpacity}
              visible={overlay === "channelInfo"}
            />
            <BottomSheetOverlay
              overlayOpacity={overlayOpacity}
              visible={overlay === "addMembers" || overlay === "confirmation"}
            />
          </UserInfoOverlayProvider>
        </ChannelInfoOverlayProvider>
      </BottomSheetOverlayProvider>
    </ChatOverlayContext.Provider>
  )
}
