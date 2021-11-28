import { View } from "react-native"
import tw from "app/lib/tailwind"

const Centered = ({
  direction,
  children,
  style,
  ...props
}: {
  direction: "row" | "col"
  children: React.ReactNode
  style?: any
}) => (
  <View style={[tw`flex-${direction} items-center justify-center`, style]} {...props}>
    {children}
  </View>
)

export const CenteredRow = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode
  style?: any
}) => (
  <Centered direction={"row"} style={style} {...props}>
    {children}
  </Centered>
)
export const CenteredColumn = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode
  style?: any
}) => (
  <Centered direction={"col"} style={style} {...props}>
    {children}
  </Centered>
)

export default Centered
