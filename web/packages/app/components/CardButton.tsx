import tw from "app/lib/tailwind"
import { ViewProps, TouchableOpacity } from "react-native"

export const CardButton: React.FC<{
  children: React.ReactNode
  onPress: () => void
  style?: ViewProps
  width?: number
  height?: number
  buttonType?: "BOTTOM" | "TOP"
}> = ({
  children,
  onPress,
  style = tw`bg-brand-black flex-row items-center justify-center`,
  width,
  height,
  buttonType = "BOTTOM",
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: width,
      height: height,
      ...style,
      borderBottomLeftRadius: buttonType === "BOTTOM" ? 16 : 0,
      borderBottomRightRadius: buttonType === "BOTTOM" ? 16 : 0,
      borderTopLeftRadius: buttonType === "TOP" ? 16 : 0,
      borderTopRightRadius: buttonType === "TOP" ? 16 : 0,
    }}
  >
    {children}
  </TouchableOpacity>
)
