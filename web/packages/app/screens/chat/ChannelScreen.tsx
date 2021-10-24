import React, { useContext, useEffect } from "react"
import { SafeAreaView, View } from "react-native"
// import { useHeaderHeight } from "@react-navigation/stack"
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo"
import { streami18n } from "./ChannelList"

const ChannelScreen = ({ navigation }) => {
  // const { channel, setThread, thread } = useContext(AppContext)
  // const headerHeight = useHeaderHeight()
  const { setTopInset } = useAttachmentPickerContext()

  // useEffect(() => {
  //   setTopInset(headerHeight)
  // }, [headerHeight])

  return null
  // <SafeAreaView>
  //   <Chat client={chatClient} i18nInstance={streami18n}>
  //     <Channel
  //       channel={channel}
  //       keyboardVerticalOffset={headerHeight}
  //       thread={thread}
  //     >
  //       <View style={{ flex: 1 }}>
  //         <MessageList
  //           onThreadSelect={(thread) => {
  //             setThread(thread)
  //             navigation.navigate("Thread")
  //           }}
  //         />
  //         <MessageInput />
  //       </View>
  //     </Channel>
  //   </Chat>
  // </SafeAreaView>
}

export default ChannelScreen
