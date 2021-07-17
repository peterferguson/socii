import React from "react"
import { FiX } from "react-icons/fi"
import { Thread } from "stream-chat-react"
import { MessagingInput } from "./index"

const ThreadHeader = ({ closeThread, thread }) => {
  const getReplyCount = () => {
    if (!thread?.reply_count) return ""
    if (thread.reply_count === 1) return "1 reply"
    return `${thread.reply_count} Replies`
  }

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b-2 border-gray-200 rounded-b-none shadow-xl md:h-16 rounded-xl border-opacity-25">
      <div className="flex items-center ml-5">
        <p className="mr-5 text-lg font-bold font-primary">Thread</p>
        <p className="opacity-50 font-secondary">{getReplyCount()}</p>
      </div>
      <FiX className="w-8 h-8 mr-2 cursor-pointer" onClick={(e) => closeThread(e)} />
    </div>
  )
}

const MessagingThread = () => (
  <Thread MessageInput={MessagingInput} ThreadHeader={ThreadHeader} fullWidth={true} />
)

export default MessagingThread
