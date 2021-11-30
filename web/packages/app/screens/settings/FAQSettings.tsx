import React from "react"
import { ScrollView, Text, View } from "react-native"
import tw from "app/lib/tailwind"
import { shadowStyle } from "app/utils/shadowStyle"

//import nativeToast from 'native-toast'

// TODO
// - Add FAQ docs and link

const FAQSettingsScreen = () => {
  return (
    <View style={tw`flex flex-row justify-center`}>
      <View
        style={{
          ...tw`h-full w-95%  dark:bg-brand-black rounded-tr-xl rounded-tl-xl p-3`,
          ...shadowStyle("xl"),
        }}
      >
        {/* // header info text */}
        <Text style={tw`text-center text-lg text-brand-black pb-3`}>
          FAQ and articles to help you understand the app.
        </Text>
        <Text style={tw`text-center text-pink-400 pb-3`}>
          This will be added soon - keep an eye on our social media for future releases!
        </Text>

        <ScrollView
          style={{
            ...tw`p-2 h-full`,
            ...{ flexGrow: 1 },
          }}
        ></ScrollView>
      </View>
    </View>
  )
}

export default FAQSettingsScreen
