import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, memo, useContext, useState } from "react"
import { ChatContext } from "stream-chat-react"
import ChatUserSearch, { StreamUser } from "./ChatUserSearch"

interface CreateChatModalProps {
  isCreating: boolean
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateChatModal = ({ isCreating, setIsCreating }: CreateChatModalProps) => {
  const { client, setActiveChannel } = useContext(ChatContext)
  const [selectedUsers, setSelectedUsers] = useState<StreamUser[]>([])
  const [users, setUsers] = useState<StreamUser[]>([])

  const closeModal = () => setIsCreating(false)

  const createChannel = async () => {
    const selectedUsersIds = selectedUsers.map((u) => u.id)

    if (!selectedUsersIds.length) return

    const conversation = await client.channel("messaging", {
      members: [...selectedUsersIds, client.userID],
    })

    await conversation.watch()

    setActiveChannel(conversation)
    setSelectedUsers([])
    setUsers([])
    closeModal()
  }

  return (
    <Transition appear show={isCreating} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
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
                className="text-lg font-medium text-brand leading-6"
              >
                Add Members to a Chat
              </Dialog.Title>
              <ChatUserSearch
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                users={users}
                setUsers={setUsers}
              />
              <div className="flex items-center justify-center mx-auto mt-4 font-medium text-tiny sm:text-sm">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mx-3 text-blue-800 bg-blue-100 border border-transparent sm:mx-8 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Never mind!
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 mx-3 text-red-800 bg-red-100 border border-transparent sm:mx-8 rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={createChannel}
                >
                  Add members
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default memo(CreateChatModal)
