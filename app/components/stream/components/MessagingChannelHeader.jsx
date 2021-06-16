import AvatarGroup from "@components/stream/components/AvatarGroup"
import { Dialog, Transition } from "@headlessui/react"
import styles from "@styles/MessagingChannelHeader.module.css"
import React, { Fragment, useContext, useEffect, useRef, useState } from "react"
import { FaList } from "react-icons/fa"
import { HiOutlineCog } from "react-icons/hi"
import { ImBin, ImCross, ImPencil } from "react-icons/im"
import { MdSave } from "react-icons/md"
import { ChannelStateContext, ChatContext } from "stream-chat-react"
import TypingIndicator from "./TypingIndicator"

// TODO: Add tooltips to settings icons
const MessagingChannelHeader = ({ toggleHideChannelList }) => {
  const { client } = useContext(ChatContext)
  const { channel } = useContext(ChannelStateContext)

  const [channelName, setChannelName] = useState(channel?.data.name || "")
  const [isEditing, setIsEditing] = useState(false)
  const [usingSettings, setUsingSettings] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [title, setTitle] = useState("")

  const inputRef = useRef()

  const members = Object.values(channel.state?.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id
  )

  const updateChannel = async (e) => {
    if (e) e.preventDefault()

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
        className="w-full ml-6 font-bold outline-none font-poppins"
        onBlur={updateChannel}
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="Type a new name for the chat"
        ref={inputRef}
        value={channelName}
      />
    </form>
  )

  return (
    <Fragment>
      <div className="flex items-center justify-between h-12 bg-white border-b-2 border-gray-200 rounded-b-none shadow-2xl md:h-16 rounded-xl border-opacity-25">
        {toggleHideChannelList && (
          <FaList
            className="w-5 h-5 ml-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
            onClick={toggleHideChannelList}
          />
        )}
        {AvatarGroup(members, styles)}
        {!isEditing ? (
          <div className="flex-1 pl-4 font-bold font-poppins">
            {channelName || title}
          </div>
        ) : (
          <EditHeader />
        )}
        <div>
          <TypingIndicator />
          {usingSettings ? (
            !isEditing ? (
              <div className="flex">
                <ImPencil
                  className="w-5 h-5 mr-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
                  onClick={() => {
                    if (!isEditing) setIsEditing(true)
                  }}
                />
                <ImBin
                  className="w-5 h-5 mr-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
                  onClick={() => setShowDelete(true)}
                />
                <ImCross
                  className="w-5 h-5 mr-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
                  onClick={() => setUsingSettings(false)}
                />
              </div>
            ) : (
              <MdSave className="w-5 h-5 mr-6 cursor-pointer text-brand hover:text-brand-dark btn-transition" />
            )
          ) : (
            <HiOutlineCog
              className="w-5 h-5 mr-6 cursor-pointer text-brand hover:text-brand-dark btn-transition"
              onClick={() => setUsingSettings(true)}
            />
          )}
        </div>
      </div>
      {showDelete && (
        <DeleteChannelModal showDelete={showDelete} setShowDelete={setShowDelete} />
      )}
    </Fragment>
  )
}

const DeleteChannelModal = ({ showDelete: isOpen, setShowDelete: setIsOpen }) => {
  const { channel } = useContext(ChannelStateContext)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const deleteChannel = async () => await channel.delete()

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-red-600 leading-6"
                >
                  Delete Channel
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this channel? This action is
                    irreversible & will delete the channel for all members!
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mx-8 text-sm font-medium text-blue-800 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    No, take me back!
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mx-8 text-sm font-medium text-red-800 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={deleteChannel}
                  >
                    Yes, delete!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default React.memo(MessagingChannelHeader)
