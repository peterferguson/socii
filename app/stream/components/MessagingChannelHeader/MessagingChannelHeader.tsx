import DeleteChannelModal from "@components/DeleteChatModal"
import AvatarGroup from "@stream/components/AvatarGroup"
import styles from "@styles/MessagingChannelHeader.module.css"
import { useRouter } from "next/router"
import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { FaChevronDown, FaList } from "react-icons/fa"
import { HiOutlineCog } from "react-icons/hi"
import { ImBin, ImCross, ImPencil, ImUserPlus } from "react-icons/im"
import { MdSave } from "react-icons/md"
import { useMediaQuery } from "react-responsive"
import { ChannelStateContext, ChatContext } from "stream-chat-react"
import TypingIndicator from "../TypingIndicator"

// TODO: Add tooltips to settings icons
const MessagingChannelHeader = ({ toggleChannelList }) => {
  const { client } = useContext(ChatContext)
  const { channel } = useContext(ChannelStateContext)

  const is1Col = !useMediaQuery({ minWidth: 640 })

  const [channelName, setChannelName] = useState(channel?.data.name || "")
  const [isEditing, setIsEditing] = useState(false)
  const [usingSettings, setUsingSettings] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [title, setTitle] = useState("")

  const inputRef = useRef(null)
  const router = useRouter()

  const members = Object.values(channel.state?.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id
  )

  const updateChannel = async (e) => {
    e && e.preventDefault()

    if (channelName && channelName !== channel.data.name) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      )
    }

    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (!channelName) {
      setTitle(
        members
          .map((member) => member.user?.name || member.user?.id || "Unnamed User")
          .join(", ")
      )
    }
  }, [channelName, members])

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
        className="w-full ml-6 font-bold outline-none font-primary"
        onBlur={updateChannel}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Type a new name for the chat"
        ref={inputRef}
        value={channelName}
      />
    </form>
  )

  const deleteChannel = async () => {
    await channel.delete()
    toggleChannelList()
  }

  return (
    <Fragment>
      <div
        className="flex items-center justify-between h-12 bg-white md:h-16 border-opacity-25"
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        {!is1Col ? (
          <FaList
            className="w-5 h-5 ml-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
            onClick={toggleChannelList}
          />
        ) : (
          <FaChevronDown
            className="w-5 h-5 ml-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
            onClick={() => router.back()}
          />
        )}
        {AvatarGroup(members, styles)}
        {!isEditing ? (
          <div className="flex-1 pl-4 font-bold font-primary">
            {channelName || title}
          </div>
        ) : (
          <EditHeader />
        )}
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
                <a className="mx-1">
                  <ImBin
                    className="w-5 h-5 text-brand hover:text-brand-dark btn-transition"
                    onClick={() => setShowDelete(true)}
                  />
                </a>
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
