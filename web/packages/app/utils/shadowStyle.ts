import { Platform } from "react-native"
import tw from "../lib/tailwind"
export const shadowStyle = (tailwindShadowSize: string) => {
  const style = tw`shadow-${tailwindShadowSize}`
  // @ts-ignore
  const { elevation, ...iosStyle } = style

  return Platform.OS === "ios" ? iosStyle : style
}
