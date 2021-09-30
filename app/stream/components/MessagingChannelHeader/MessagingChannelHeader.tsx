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
import { tw } from "@utils/tw"

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

  // ? this should proably be a open channel list
  const deleteChannel = async () => (await channel.delete()) && toggleChannelList()

  return (
    <Fragment>
      <div
        className={tw(
          "h-12 bg-white grid md:h-16 border-opacity-25",
          isEditing ? "grid-cols-5" : "grid-cols-2"
        )}
        style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      >
        <div
          className={tw("flex items-center justify-center", isEditing && "col-span-4")}
        >
          {is1Col && (
            <HeaderButton
              Icon={FaChevronLeft}
              className="ml-4 mr-2 cursor-pointer"
              onClick={() => router.back()}
            />
          )}
          <button
            className="pointer-events-auto grid place-items-center"
            title="Channel List"
          >
            <HeaderButton
              Icon={FaList}
              className="ml-0 mr-4 sm:ml-6"
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
        </div>
        {/* TODO: Convert to its own component */}
        <Fragment>
          <TypingIndicator />
          {/* TODO: Generalise the channelName condition to a chat type condition */}
          <div className="flex justify-end mr-2">
            {channelName !== "sociians" ? (
              usingSettings ? (
                !isEditing ? (
                  <>
                    {[
                      {
                        Icon: ImPencil,
                        onClick: () => !isEditing && setIsEditing(true),
                      },
                      // TODO: Create add chat member modal
                      { Icon: ImUserPlus, onClick: () => null },
                      { Icon: ImBin, onClick: () => setShowDelete(true) },
                      { Icon: ImCross, onClick: () => setUsingSettings(false) },
                    ].map(({ Icon, onClick }, i) => (
                      <HeaderButton
                        key={`header-btn-${i}`}
                        Icon={Icon}
                        onClick={onClick}
                      />
                    ))}
                  </>
                ) : (
                  <HeaderButton Icon={MdSave} onClick={() => null} />
                )
              ) : (
                <HeaderButton
                  Icon={HiOutlineCog}
                  className="mr-4"
                  onClick={() => setUsingSettings(true)}
                />
              )
            ) : null}
          </div>
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

const HeaderButton = ({ Icon, onClick, className = null }) => (
  <button className={tw(className, "mx-1")}>
    <Icon
      className="w-6 h-6 sm:w-5 sm:h-5 text-brand hover:text-brand-dark btn-transition"
      onClick={onClick}
    />
  </button>
)

export default React.memo(MessagingChannelHeader)
