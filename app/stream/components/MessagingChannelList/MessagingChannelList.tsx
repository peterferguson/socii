import { getRandomImage } from "@utils/getRandomImage"
import { getInitials } from "@utils/getInitials"
import React, { memo, useContext } from "react"
import { HiOutlinePencilAlt } from "react-icons/hi"
import { Avatar, ChatContext } from "stream-chat-react"
import { SkeletonLoader } from "./SkeletonLoader"
import { tw } from "@utils/tw"

interface IMessagingChannelList {
  children?: React.ReactNode
  error?: boolean
  loading: boolean
  onCreateChannel: () => void
}

const MessagingChannelList = ({
  children,
  error = false,
  loading,
  onCreateChannel,
}: IMessagingChannelList) => {
  const { client } = useContext(ChatContext)
  const { id, name } = client?.user || {}
  const image = getRandomImage(getInitials(name))

  const ListHeaderWrapper = ({ children }) => (
    <div className="flex flex-col px-6 py-3 pt-5 overflow-x-hidden overflow-y-auto rounded-2xl no-scrollbar space-y-4">
      <div className="flex items-center justify-between py-3 pl-5 mb-5">
        <Avatar image={image} name={name} size={40} />
        <div className="flex text-base font-semibold font-primary">{name || id}</div>
        <button
          className={tw(
            "flex items-center justify-center w-10 h-10 ml-auto mr-5 border rounded-full",
            "shadow-2xl cursor-pointer bg-gray-50 border-brand-natural-darkes",
            "focus:outline-none",
            "umami--click--chat-channel-preview-create-channel-button"
          )}
          onClick={onCreateChannel}
        >
          <HiOutlinePencilAlt className="w-5 h-5 text-brand" />
        </button>
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

  if (loading || !client?.user) {
    return (
      <ListHeaderWrapper>
        <div className="mt-0.5 ml-0.5">
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    )
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>
}

export default memo(MessagingChannelList)
