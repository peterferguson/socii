import { uncamelCase } from "../../utils/uncamelCase"
import { useRouter } from "../../navigation/use-router"
import { View, Text, Pressable, Image } from "react-native"
import tw from "../../lib/tailwind"
import { shadowStyle } from "../../utils/shadowStyle"

const StockDisplayAttachment = ({ attachment }) => {
  const tickerSymbol = attachment?.name
  const { name, exchange, ...asset } = attachment?.asset
  const router = useRouter()
  return (
    <Pressable
      style={{
        ...tw`flex-col items-center justify-center p-4 mb-2 bg-white rounded-lg`,
        ...shadowStyle("lg"),
      }}
      onPress={() => router.push(attachment?.url)}
    >
      <Image
        style={{ ...tw`h-auto mx-auto rounded-full w-14`, ...shadowStyle("lg") }}
        source={{ uri: attachment?.image }}
      />
      <View style={tw`w-auto h-auto p-1`}>
        <View style={tw`px-2 mx-1 rounded-full w-full`}>
          <Text style={tw`text-xl text-center font-poppins-400`}>{name}</Text>
          <Text style={tw`text-sm text-gray-600`}>
            ${tickerSymbol} &bull; {exchange}
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-col`}>
        {asset &&
          Object.keys(asset).map(key => {
            return (
              <View key={key} style={tw`w-full mt-2 ml-2 sm:mt-4`}>
                <Text
                  style={tw`text-xs font-semibold tracking-wider text-left text-brand`}
                >
                  {uncamelCase(key)} &bull;
                </Text>
                <Text style={tw`text-gray-600 text-tiny font-poppins-400`}>
                  {asset[key]}
                </Text>
              </View>
            )
          })}
      </View>
    </Pressable>
  )
}

export default StockDisplayAttachment
