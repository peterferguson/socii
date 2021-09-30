import React from "react"
import styles from "@styles/MessagingThreadHeader.module.css"
import { FiX } from "react-icons/fi"

const ThreadHeader = ({ closeThread, thread }) => {
  const getReplyCount = () => {
    if (!thread?.reply_count) return ""
    if (thread.reply_count === 1) return "1 reply"
    return `${thread.reply_count} Replies`
  }

  return (
    <div className={styles["custom-thread-header"]}>
      <div className={styles["custom-thread-header__left"]}>
        <p className={styles["custom-thread-header__left-title"]}>Thread</p>
        <p className={styles["custom-thread-header__left-count"]}>{getReplyCount()}</p>
      </div>
      <FiX className="w-6 h-6 mr-4 cursor-pointer" onClick={(e) => closeThread(e)} />
    </div>
  )
}

export default ThreadHeader
