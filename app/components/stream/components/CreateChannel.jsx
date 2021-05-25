import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Avatar, ChatContext } from "stream-chat-react"
import _debounce from "lodash.debounce"

import XButton from "@icons/stream/XButton.svg"
import XButtonBackground from "@icons/stream/XButtonBackground.svg"

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

const CreateChannel = ({ onClose, toggleMobile }) => {
  const { client, setActiveChannel } = useContext(ChatContext)

  const [focusedUser, setFocusedUser] = useState(undefined)
  const [inputText, setInputText] = useState("")
  const [resultsOpen, setResultsOpen] = useState(false)
  const [searchEmpty, setSearchEmpty] = useState(false)
  const [searching, setSearching] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [users, setUsers] = useState([])

  const inputRef = useRef()

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
    if (inputText) {
      findUsersDebounce()
    }
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
    onClose()
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
      // check for up(38) or down(40) key
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
    [users, focusedUser] // eslint-disable-line
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="flex-col flex-1 w-full my-1 bg-white shadow-2xl sm:flex h-[unset] sm:h-screen rounded-xl">
      <header className="flex items-center justify-between pl-6 rounded-b-none bg-gray-50 shadow-4xl rounded-xl pr-2.5">
        <div className="flex items-center flex-1">
          <div className="text-lg opacity-50 mr-2.5 font-work-sans">To: </div>
          <div className=" min-w-85 mt-1.5 -mb-1.5">
            {!!selectedUsers?.length && (
              <div className="flex flex-wrap px-2 max-w-95">
                {selectedUsers.map((user) => (
                  <div
                    className="flex items-center justify-between px-3 bg-gray-200 rounded-full cursor-pointer opacity-90 py-1.5"
                    onClick={() => removeUser(user)}
                    key={user.id}
                  >
                    <div className="mr-2">{user.name}</div>
                    <XButton className="w-2 h-2" />
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={addUser} className="flex items-center h-12 pb-2">
              <input
                autoFocus
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={!selectedUsers.length ? "Type for suggestions" : ""}
                type="text"
                className="max-w-xs border-none focus:outline-none bg-gray-50"
              />
            </form>
          </div>
          <div className="sm:hidden" onClick={() => toggleMobile()}>
            <XButtonBackground className="w-4 h-4 bg-brand-teal" />
          </div>
        </div>
        <button
          className="flex-1 h-10 text-lg font-extrabold text-white border-none outline-none cursor-pointer rounded-3xl right-3 min-w-[76px] max-w-[111px] bg-brand-light font-poppins"
          onClick={createChannel}
        >
          Chat
        </button>
      </header>
      {inputText && (
        <main className="flex-1">
          <ul className="flex flex-col max-w-xs p-0 mt-1 ml-1 overflow-y-auto list-none shadow-2xl opacity-90 rounded-xl">
            {!!users?.length && !searchEmpty && (
              <div>
                {users.map((user, i) => (
                  <div
                    className={` h-14 flex items-center justify-between m-0 p-2 cursor-pointer ${
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
  )
}

export default memo(CreateChannel)
