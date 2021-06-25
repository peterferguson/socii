import { Dialog, Transition } from "@headlessui/react"
import XButton from "@icons/stream/XButton.svg"
import XButtonBackground from "@icons/stream/XButtonBackground.svg"
import _debounce from "lodash.debounce"
import React, {
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Avatar, ChatContext } from "stream-chat-react"

const UserResult = ({ user }) => (
  <li className="flex items-center justify-between h-12 p-2 m-0 cursor-pointer focus:bg-white">
    <Avatar image={user.image} size={40} />
    {user.online && (
      <div className="relative w-4 h-4 rounded-lg right-7 bottom-[14px] border-gray-50 transition-colors ease-in-out duration-100 hover:border-white" />
    )}
    <div className="flex flex-col">
      <span>{user.name}</span>
      <span className=" text-xs font-normal">{user.online}</span>
    </div>
  </li>
)

const CreateChatModal = ({ isCreating, setIsCreating }) => {
  const { client, setActiveChannel } = useContext(ChatContext)
  
  const [focusedUser, setFocusedUser] = useState(undefined)
  const [inputText, setInputText] = useState("")
  const [resultsOpen, setResultsOpen] = useState(false)
  const [searchEmpty, setSearchEmpty] = useState(false)
  const [searching, setSearching] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [users, setUsers] = useState([])
  
  const inputRef = useRef()

  const closeModal = () => setIsCreating(false)
  
  const clearState = () => {
    setInputText("")
    setResultsOpen(false)
    setSearchEmpty(false)
  }

  useEffect(() => {
    const clickListener = () => {
      if (resultsOpen) clearState()
    }

    inputRef.current.focus()

    document.addEventListener("click", clickListener)

    return () => document.removeEventListener("click", clickListener)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const findUsers = async () => {
    if (searching) return
    setSearching(true)

    try {
      const response = await client.queryUsers(
        {
          id: { $ne: client.userID },
          $and: [
            { name: { $autocomplete: inputText } },
            {
              name: { $nin: ["Daniel Smith", "Kevin Rosen", "Jen Alexander"] },
              // TODO: Change to member of the current chat
              // TODO: If adding members to the existing chat
            },
          ],
        },
        { id: 1 },
        { limit: 6 }
      )

      if (!response.users.length) {
        setSearchEmpty(true)
      } else {
        setSearchEmpty(false)
        setUsers(response.users)
      }

      setResultsOpen(true)
    } catch (error) {
      console.log({ error })
    }

    setSearching(false)
  }

  const findUsersDebounce = _debounce(findUsers, 100, {
    trailing: true,
  })

  useEffect(() => {
    if (inputText) findUsersDebounce()
  }, [inputText]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const addUser = (u) => {
    const isAlreadyAdded = selectedUsers.find((user) => user.id === u.id)
    if (isAlreadyAdded) return

    setSelectedUsers([...selectedUsers, u])
    setResultsOpen(false)
    setInputText("")
    inputRef.current.focus()
  }

  const removeUser = (user) => {
    const newUsers = selectedUsers.filter((item) => item.id !== user.id)
    setSelectedUsers(newUsers)
    inputRef.current.focus()
  }

  const handleKeyDown = useCallback(
    (e) => {
      // - check for up (38) or down (40) key or return (13) key
      if (e.which === 38) {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0
          return prevFocused === 0 ? users.length - 1 : prevFocused - 1
        })
      }
      if (e.which === 40) {
        setFocusedUser((prevFocused) => {
          if (prevFocused === undefined) return 0
          return prevFocused === users.length - 1 ? 0 : prevFocused + 1
        })
      }
      if (e.which === 13) {
        e.preventDefault()
        if (focusedUser !== undefined) {
          addUser(users[focusedUser])
          return setFocusedUser(undefined)
        }
      }
    },
    [users, focusedUser] //eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

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
              <div className="mt-2">
                <form onSubmit={addUser} className="flex items-center h-12 pb-2">
                  <input
                    autoFocus
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={!selectedUsers.length ? "Search users..." : ""}
                    type="text"
                    className="w-full max-w-md border-none rounded-full focus:outline-none focus-within:ring-brand-light focus-within:ring-2 bg-gray-50"
                  />
                </form>
                <div className=" min-w-[85%] mt-1.5 -mb-1.5">
                  {!!selectedUsers?.length && (
                    <div className="flex flex-wrap px-2 max-w-95">
                      {selectedUsers.map((user) => (
                        <div
                          className="flex items-center justify-between px-3 bg-gray-200 rounded-full cursor-pointer opacity-90 py-[6px]"
                          onClick={() => removeUser(user)}
                          key={user.id}
                        >
                          <div className="mr-2">{user.name}</div>
                          <XButton className="w-2 h-2" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {inputText && (
                  <main className="flex-1">
                    <ul className="flex flex-col max-w-xs p-0 mt-1 ml-1 overflow-y-auto list-none shadow-2xl opacity-90 rounded-xl">
                      {!!users?.length && !searchEmpty && (
                        <div>
                          {users.map((user, i) => (
                            <div
                              className={`h-14 flex items-center justify-between m-0 p-2 cursor-pointer ${
                                focusedUser === i && "bg-white"
                              }`}
                              onClick={() => addUser(user)}
                              key={user.id}
                            >
                              <UserResult user={user} />
                            </div>
                          ))}
                        </div>
                      )}
                      {searchEmpty && (
                        <div
                          onClick={() => {
                            inputRef.current.focus()
                            clearState()
                          }}
                          className="pl-4"
                        >
                          No people found...
                        </div>
                      )}
                    </ul>
                  </main>
                )}
              </div>

              <div className="mt-4 font-medium text-tiny sm:text-sm">
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
                  Create this chat
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
