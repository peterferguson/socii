import { getInitials } from "@utils/getInitials"
import { getRandomImage } from "@utils/getRandomImage"
import React from "react"
import { Avatar } from "stream-chat-react"

const AvatarGroup = ({ memberNames, size = 32 }) => {
  // TODO: Convert to try the avatar/userPhotoUrl first
  switch (memberNames?.length) {
    case 1:
      return (
        <div className="messaging__channel-header__avatars">
          <Avatar image={getRandomImage(getInitials(memberNames?.[0]))} size={size} />
        </div>
      )

    case 2:
      return (
        <div className="messaging__channel-header__avatars two">
          <span>
            <Avatar
              image={getRandomImage(getInitials(memberNames?.[0]))}
              shape="square"
              size={size}
            />
          </span>
          <span>
            <Avatar
              image={getRandomImage(getInitials(memberNames[1]))}
              shape="square"
              size={size}
            />
          </span>
        </div>
      )

    case 3:
      return (
        <div className="messaging__channel-header__avatars three">
          <span>
            <Avatar
              image={getRandomImage(getInitials(memberNames?.[0]))}
              shape="square"
              size={size}
            />
          </span>
          <span>
            <Avatar
              image={getRandomImage(getInitials(memberNames[1]))}
              shape="square"
              size={size / 2}
            />
            <Avatar
              image={getRandomImage(getInitials(memberNames[2]))}
              shape="square"
              size={size / 2}
            />
          </span>
        </div>
      )

    case null || undefined:
      return null

    default:
      return (
        <div className="messaging__channel-header__avatars four">
          <span>
            <Avatar
              image={getRandomImage(getInitials(memberNames[memberNames.length - 1]))}
              shape="square"
              size={size / 2}
            />
            <Avatar
              image={getRandomImage(getInitials(memberNames[memberNames.length - 2]))}
              shape="square"
              size={size / 2}
            />
          </span>
          <span>
            <Avatar
              image={getRandomImage(getInitials(memberNames[memberNames.length - 3]))}
              shape="square"
              size={size / 2}
            />
            <Avatar
              image={getRandomImage(getInitials(memberNames[memberNames.length - 4]))}
              shape="square"
              size={size / 2}
            />
          </span>
        </div>
      )
  }
}

export default AvatarGroup
