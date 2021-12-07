import React from "react"
import * as Haptics from "expo-haptics"
import { MessageSimple } from "stream-chat-expo"
// import { MessageFooter } from "./MessageFooter"
// import { MessageText } from "./MessageText"
// import { MessageAvatar } from "./MessageAvatar"
// import { MessageHeader } from "./MessageHeader"
// import { UrlPreview } from "./UrlPreview"
// import { Giphy } from "./Giphy"
// import { MessageActionSheet } from "./MessageActionSheet"
// import { getSupportedReactions } from "../utils/supportedReactions"

export const Message = props => {
  console.log("Message props", props)
  if (!props?.message.type) {
    console.log("Message props", props.message)
    return null
  }
  if (props.message.deleted_at) {
    return null
  }
  return (
    props.message &&
    props.message?.type && (
      <MessageSimple
        {...props}
        //   forceAlign="left"
        //   ReactionList={null}
        //   onLongPress={() => {
        //     Haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        //     props.showActionSheet()
        //   }}
        //   textBeforeAttachments={false}
        //   ActionSheet={MessageActionSheet}
        //   MessageAvatar={MessageAvatar}
        //   MessageHeader={MessageHeader}
        //   MessageFooter={MessageFooter}
        //   MessageText={MessageText}
        //   UrlPreview={UrlPreview}
        //   Giphy={Giphy}
        //   supportedReactions={getSupportedReactions(false)}
      />
    )
  )
}
