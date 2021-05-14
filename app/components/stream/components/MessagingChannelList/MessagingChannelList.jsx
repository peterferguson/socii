import { memo } from "react";
import { Avatar } from "stream-chat-react";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import styles from "@styles/MessagingChannelList.module.css";
import { SkeletonLoader } from "./SkeletonLoader";

import CreateChannelIcon from "@icons/stream/createChannelIcon.svg";

const MessagingChannelList = ({
  children,
  error = false,
  loading,
  onCreateChannel,
}) => {
  const { streamClient } = useContext(UserContext);

  const { id, name, image } = streamClient.user || {};

  const ListHeaderWrapper = ({ children }) => (
    <div className={styles["messaging__channel-list"]}>
      <div className={styles["messaging__channel-list__header"]}>
        <Avatar image={image} name={name} size={40} />
        <div className={styles["messaging__channel-list__header__name"]}>
          {name || id}
        </div>
        <button
          className={styles["messaging__channel-list__header__button"]}
          onClick={onCreateChannel}
        >
          <CreateChannelIcon className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );

  if (error) {
    return (
      <ListHeaderWrapper>
        <div className={styles["messaging__channel-list__message"]}>
          Error loading conversations, please try again momentarily.
        </div>
      </ListHeaderWrapper>
    );
  }

  if (loading || !streamClient.user) {
    return (
      <ListHeaderWrapper>
        <div className={styles["messaging__channel-list__message"]}>
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    );
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
};

export default memo(MessagingChannelList);
