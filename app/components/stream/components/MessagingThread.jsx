import { Thread } from "stream-chat-react";
import { CustomMessage, MessagingInput } from "./index";
import CloseThreadIcon from "@icons/stream/closeThreadIcon.svg";

import styles from "@styles/MessagingThread.module.css";

const ThreadHeader = ({ closeThread, thread }) => {
  const getReplyCount = () => {
    if (!thread?.reply_count) return "";
    if (thread.reply_count === 1) return "1 reply";
    return `${thread.reply_count} Replies`;
  };

  return (
    <div className={styles["custom-thread-header"]}>
      <div className={styles["custom-thread-header__left"]}>
        <p className={styles["custom-thread-header__left-title"]}>Thread</p>
        <p className={styles["custom-thread-header__left-count"]}>
          {getReplyCount()}
        </p>
      </div>
      <CloseThreadIcon
        className="cursor-pointer mr-2 h-8 w-8"
        onClick={(e) => closeThread(e)}
      />
    </div>
  );
};

const MessagingThread = () => {
  return (
    <Thread
      Message={CustomMessage}
      MessageInput={MessagingInput}
      ThreadHeader={ThreadHeader}
    />
  );
};

export default MessagingThread;
