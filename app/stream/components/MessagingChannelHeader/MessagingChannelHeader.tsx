import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { MdSave } from "react-icons/md"
import { useMediaQuery } from "react-responsive"
import { ChannelStateContext, ChatContext } from "stream-chat-react"
import TypingIndicator from "../TypingIndicator"

import { FaChevronLeft, FaList } from "react-icons/fa"
import { HiOutlineCog } from "react-icons/hi"
import { ImBin, ImCross, ImPencil, ImUserPlus } from "react-icons/im"

const DeleteChannelModal = dynamic(() => import("@components/DeleteChatModal"))
const AvatarGroup = dynamic(
  () => import("@stream/components/AvatarGroup") as any
) as any

// TODO: Add tooltips to settings icons
const MessagingChannelHeader = ({ toggleChannelList }) => {
  const { client } = useContext(ChatContext)
  const { channel } = useContext(ChannelStateContext)

  const is1Col = !useMediaQuery({ minWidth: 640 })

  const [channelType, channelName] = channel.cid.split(":")
  const [members, _setMembers] = useState(
    Object.values(channel.state?.members || {}).filter(
      (member) => member.user?.id !== client?.user?.id
    ) || []
  )
  const [memberNames, setMemberNames] = useState([])
  const [newChannelName, setNewChannelName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [usingSettings, setUsingSettings] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [title, setTitle] = useState("")

  const inputRef = useRef(null)
  const router = useRouter()

  const onGroupPage = router.asPath.includes("groups")
  useEffect(
    () =>
      setMemberNames(
        channelType === "group"
          ? // - show all memebers except yourself
            [channelName.replace(/-/g, " ")]
          : // - edge case: use first initial for chat picture for group chats
            members.map((member) => member.user.name)
      ),
    [channelName, channelType, members]
  )

  const updateChannel = async (e) => {
    e && e.preventDefault()

    newChannelName &&
      newChannelName !== channel.data.name &&
      (await channel.update(
        { name: newChannelName },
        { text: `Channel name changed to ${newChannelName}` }
      ))

    setIsEditing(false)
  }

  useEffect(
    () => isEditing && inputRef.current && inputRef.current.focus(),
    [isEditing]
  )

  useEffect(
    () =>
      (!channelName || channelName.slice(0, 8) === "!members") &&
      setTitle(
        members
          .map((member) => member.user?.name || member.user?.id || "Unnamed User")
          .join(", ")
      ),
    [channelName, members]
  )

  const EditHeader = () => (
    <form
      className="flex-1"
      onSubmit={(e) => {
        e.preventDefault()
        inputRef.current.blur()
      }}
    >
      <input
        autoFocus
        className="w-full ml-6 font-semibold outline-none font-primary"
        onBlur={updateChannel}
        onChange={(e) => setNewChannelName(e.target.value)}
        placeholder="Type a new name for the chat"
        ref={inputRef}
        value={channelName}
      />
    </form>
  )

  const deleteChannel = async () => {
    await channel.delete()
    // ? this should proably be a open channel list
    toggleChannelList()
  }

  return (
    <Fragment>
      <div
        className="flex items-center justify-between h-12 bg-white md:h-16 border-opacity-25"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        {is1Col && (
          <FaChevronLeft
            className="w-5 h-5 ml-4 mr-2 cursor-pointer text-brand hover:text-brand-dark btn-transition"
            onClick={() => router.back()}
          />
        )}
        <button
          disabled={onGroupPage}
          className="pointer-events-auto"
          title={
            !onGroupPage ? "Channel List" : "Channel Lists are disabled on group pages"
          }
        >
          <FaList
            className={`w-5 h-5 ${
              is1Col ? "ml-0" : "ml-6"
            } mr-4 text-brand hover:text-brand-dark ${
              !onGroupPage && "btn-transition"
            }`}
            onClick={toggleChannelList}
          />
        </button>
        {channel.data.image ? (
          <Image
            src={channel.data.image}
            height={40}
            width={40}
            className="rounded-full"
          />
        ) : (
          <AvatarGroup memberNames={memberNames} />
        )}
        {!isEditing ? (
          <div className="flex-1 font-semibold font-primary">
            {channelName.slice(0, 8) === "!members" ? title : channelName}
          </div>
        ) : (
          <EditHeader />
        )}
        {/* TODO: Convert to its own component */}
        <Fragment>
          <TypingIndicator />
          {usingSettings ? (
            !isEditing ? (
              <div className="flex mr-1">
                <a className="mx-1">
                  <ImPencil
                    className="w-5 h-5 text-brand hover:text-brand-dark btn-transition"
                    onClick={() => {
                      if (!isEditing) setIsEditing(true)
                    }}
                  />
                </a>
                <a className="mx-1">
                  <ImUserPlus
                    className="w-5 h-5 text-brand hover:text-brand-dark btn-transition"
                    onClick={() => {
                      if (!isEditing) setIsEditing(true)
                    }}
                  />
                </a>
                {channelName !== "sociians" && (
                  <a className="mx-1">
                    <ImBin
                      className="w-5 h-5 text-brand hover:text-brand-dark btn-transition"
                      onClick={() => setShowDelete(true)}
                    />
                  </a>
                )}
                <a className="mx-1">
                  <ImCross
                    className="w-5 h-5 text-brand hover:text-brand-dark btn-transition"
                    onClick={() => setUsingSettings(false)}
                  />
                </a>
              </div>
            ) : (
              <MdSave className="w-5 h-5 text-brand hover:text-brand-dark btn-transition" />
            )
          ) : (
            <a className="mr-4">
              <HiOutlineCog
                className="w-5 h-5 text-brand hover:text-brand-dark btn-transition"
                onClick={() => setUsingSettings(true)}
              />
            </a>
          )}
        </Fragment>
      </div>
      {showDelete && (
        <DeleteChannelModal
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          deleteChannel={deleteChannel}
        />
      )}
    </Fragment>
  )
}

export default React.memo(MessagingChannelHeader)
