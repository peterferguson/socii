import React, { useContext } from "react"
import { SafeAreaView, View } from "react-native"
// import { useHeaderHeight } from "@react-navigation/stack"
import { Channel, Chat, Thread } from "stream-chat-expo"
import { streami18n } from "./ChannelList"

const ThreadScreen = () => {
  // const { channel, setThread, thread } = useContext(AppContext)
  // const headerHeight = useHeaderHeight()

  return null
  // <SafeAreaView>
  //   <Chat client={chatClient} i18nInstance={streami18n}>
  //     <Channel
  //       channel={channel}
  //       keyboardVerticalOffset={headerHeight}
  //       thread={thread}
  //     >
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: "flex-start",
  //         }}
  //       >
  //         <Thread onThreadDismount={() => setThread(null)} />
  //       </View>
  //     </Channel>
  //   </Chat>
  // </SafeAreaView>
}

export default ThreadScreen
