import { Platform } from "react-native"
import tw from "app/lib/tailwind"
export const shadowStyle = (tailwindShadowSize: string = "") => {
  const style = !tailwindShadowSize ? tw`shadow-${tailwindShadowSize}` : tw`shadow`
  // @ts-ignore
  const { elevation, ...iosStyle } = style

  return Platform.OS === "ios" ? iosStyle : style
}
