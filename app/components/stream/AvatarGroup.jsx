import { getRandomImage, getInitials } from "@utils/helper"

import React from "react"
import { Avatar } from "stream-chat-react"

export default function AvatarGroup(members, styles) {
  if (members.length === 1) {
    console.log("member username", members?.[0]?.user.name)
    console.log("initials", getInitials(members?.[0]?.user.name))
    return (
      <div className={styles["messaging__channel-header__avatars"]}>
        <Avatar
          image={getRandomImage(getInitials(members?.[0]?.user.name))}
          size={40}
        />
      </div>
    )
  }

  if (members.length === 2) {
    return (
      <div className={styles["messaging__channel-header__avatars two"]}>
        <span>
          <Avatar
            image={getRandomImage(getInitials(members?.[0]?.user.name))}
            shape="square"
            size={40}
          />
        </span>
        <span>
          <Avatar
            image={getRandomImage(getInitials(members[1]?.user.name))}
            shape="square"
            size={40}
          />
        </span>
      </div>
    )
  }

  if (members.length === 3) {
    return (
      <div className={styles["messaging__channel-header__avatars three"]}>
        <span>
          <Avatar
            image={getRandomImage(getInitials(members?.[0]?.user.name))}
            shape="square"
            size={40}
          />
        </span>
        <span>
          <Avatar
            image={getRandomImage(getInitials(members[1]?.user.name))}
            shape="square"
            size={20}
          />
          <Avatar
            image={getRandomImage(getInitials(members[2]?.user.name))}
            shape="square"
            size={20}
          />
        </span>
      </div>
    )
  }

  if (members.length >= 4) {
    return (
      <div className={styles["messaging__channel-header__avatars four"]}>
        <span>
          <Avatar
            image={getRandomImage(getInitials(members[members.length - 1]?.user.name))}
            shape="square"
            size={20}
          />
          <Avatar
            image={getRandomImage(getInitials(members[members.length - 2]?.user.name))}
            shape="square"
            size={20}
          />
        </span>
        <span>
          <Avatar
            image={getRandomImage(getInitials(members[members.length - 3]?.user.name))}
            shape="square"
            size={20}
          />
          <Avatar
            image={getRandomImage(getInitials(members[members.length - 4]?.user.name))}
            shape="square"
            size={20}
          />
        </span>
      </div>
    )
  }

  return null
}
