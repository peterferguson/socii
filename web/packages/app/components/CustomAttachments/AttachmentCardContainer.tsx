import { View } from "react-native"
import tw from "../../lib/tailwind"

const AttachmentCardContainer = ({ children }) => (
  <View
    style={tw`flex-col items-center justify-center p-4 mb-2 bg-white rounded-lg shadow-lg`}
  >
    {children}
  </View>
)

export default AttachmentCardContainer
