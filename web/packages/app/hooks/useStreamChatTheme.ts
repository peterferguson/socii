import { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import type { DeepPartial, Theme } from "stream-chat-expo"
import tw from "../lib/tailwind"

export const useStreamChatTheme = () => {
  const colorScheme = useColorScheme()
  const getChatStyle = (): DeepPartial<Theme> => ({
    avatar: {
      image: {
        height: 32,
        width: 32,
      },
    },
    colors: {
      accent_blue: tw.color("brand"),
      accent_green: "#20E070",
      accent_red: "#FF3742",
      transparent: "transparent",
      black: tw`text-brand-black dark:text-brand-gray`.color as string,
      ...(colorScheme === "dark"
        ? {
            bg_gradient_end: "#101214",
            bg_gradient_start: "#070A0D",
            blue_alice: "#00193D",
            border: "#141924",
            grey: "#7A7A7A",
            grey_gainsboro: "#2D2F2F",
            grey_whisper: "#1C1E22",
            icon_background: "#FFFFFF",
            modal_shadow: "#000000",
            overlay: "#00000066", // 66 = 40% opacity
            overlay_dark: "#FFFFFFCC", // CC = 80% opacity
            shadow_icon: "#00000080", // 80 = 50% opacity
            targetedMessageBackground: "#302D22",
            white: "#101418",
            white_smoke: "#13151B",
            white_snow: "#070A0D",
          }
        : {
            bg_gradient_end: "#F7F7F7",
            bg_gradient_start: "#FCFCFC",
            blue_alice: "#E9F2FF",
            border: "#00000014", // 14 = 8% opacity; top: x=0, y=-1; bottom: x=0, y=1
            grey: "#7A7A7A",
            grey_gainsboro: "#DBDBDB",
            grey_whisper: "#ECEBEB",
            icon_background: "#FFFFFF",
            modal_shadow: "#00000099", // 99 = 60% opacity; x=0, y= 1, radius=4
            overlay: "#00000033", // 33 = 20% opacity
            overlay_dark: "#00000099", // 99 = 60% opacity
            shadow_icon: "#00000040", // 40 = 25% opacity; x=0, y=0, radius=4
            targetedMessageBackground: "#FBF4DD", // dark mode = #302D22
            white: "#FFFFFF",
            white_smoke: "#F2F2F2",
            white_snow: "#FCFCFC",
          }),
    },
    imageGallery: {
      blurType: colorScheme === "dark" ? "dark" : "light",
    },
    spinner: {
      height: 15,
      width: 15,
    },
  })
  const [chatStyle, setChatStyle] = useState(getChatStyle())

  useEffect(() => setChatStyle(getChatStyle()), [colorScheme])

  return chatStyle
}
