import { StreamContext } from "@lib/context"
import { getInitials, getRandomImage } from "@utils/helper"
import React, { memo, useContext } from "react"
import { MdChatBubbleOutline } from "react-icons/md"
import { Avatar } from "stream-chat-react"
import { SkeletonLoader } from "./SkeletonLoader"

const MessagingChannelList = ({
  children,
  error = false,
  loading,
  onCreateChannel,
  is1Col,
}) => {
  const { streamClient } = useContext(StreamContext)

  const { id, name } = streamClient.user || {}
  const image = getRandomImage(getInitials(name))

  const ListHeaderWrapper = ({ children }) => (
    <div className="flex flex-col px-3 py-3 pt-5 overflow-y-auto">
      <div className="flex items-center py-3 pl-5 mb-5">
        <Avatar image={image} name={name} size={40} />
        <div className="flex text-base font-extrabold font-poppins">{name || id}</div>
        {!is1Col && (
          <button
            className="flex items-center justify-center w-10 h-10 ml-auto mr-5 bg-white border-0 rounded-full shadow-2xl cursor-pointer focus:outline-none"
            onClick={onCreateChannel}
          >
            <MdChatBubbleOutline className="w-5 h-5 text-brand" />
          </button>
        )}
      </div>
      {children}
    </div>
  )

  if (error) {
    return (
      <ListHeaderWrapper>
        <div className="mt-8 ml-8">
          Error loading conversations, please try again momentarily.
        </div>
      </ListHeaderWrapper>
    )
  }

  if (loading || !streamClient.user) {
    return (
      <ListHeaderWrapper>
        <div className="mt-8 ml-8">
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    )
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>
}

export default memo(MessagingChannelList)
