import { View } from "react-native"
import tw from "app/lib/tailwind"
import { shadowStyle } from "app/utils/shadowStyle"

const AttachmentCardContainer = ({ children }) => (
  <View
    style={{
      ...tw`flex-col items-center justify-center p-4 mb-2 bg-white rounded-lg`,
      ...shadowStyle("lg"),
    }}
  >
    {children}
  </View>
)

export default AttachmentCardContainer
