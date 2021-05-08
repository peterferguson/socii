import { memo, useContext, useEffect } from "react";
import { Avatar, ChatContext } from "stream-chat-react";

import styles from "@styles/MessagingChannelList.module.css";
import { SkeletonLoader } from "./SkeletonLoader";

import CreateChannelIcon from "@icons/stream/createChannelIcon.svg";

const MessagingChannelList = ({
  children,
  error = false,
  loading,
  onCreateChannel,
}) => {
  const { client, setActiveChannel } = useContext(ChatContext);
  const { id, name, image = "@public/favicons/apple-touch-icon.png" } =
    client.user || {};

  useEffect(() => {
    const getDemoChannel = async (client) => {
      const channel = client.channel("messaging", "first", {
        name: "Social Demo",
      });
      await channel.watch();
      await channel.addMembers([client.user.id]);
      setActiveChannel(channel);
    };

    if (!loading && !children?.props?.children?.length) {
      getDemoChannel(client);
    }
  }, [loading]); // eslint-disable-line

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
          <CreateChannelIcon className="h-4 w-4"/>
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

  if (loading) {
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
