import tw from "app/lib/tailwind"
import { Dimensions, TouchableOpacity } from "react-native"

const { width: WINDOW_WIDTH } = Dimensions.get("window")

export const CARD_WIDTH = WINDOW_WIDTH - 80

export const CardFooterButton = ({
  children,
  onPress,
  style = tw`bg-brand-black flex-row items-center justify-between`,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...style,
      borderBottomRightRadius: 16,
      borderBottomLeftRadius: 16,
    }}
  >
    {children}
  </TouchableOpacity>
)
