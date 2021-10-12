import { useEffect, useState, useCallback, useRef, Fragment, useContext } from "react"
import debounce from "lodash/debounce"
import { Dialog, Transition } from "@headlessui/react"
import React from "react"
import { usernameExists } from "@lib/firebase/client/db/usernameExists"
import toast from "react-hot-toast"
import { updateUserData } from "@lib/firebase/client/functions"
import { getUserWithUsername } from "@lib/firebase/client/db"
import { useRouter } from "next/router"
import { IoIosPeople } from "react-icons/io"
import { doc, serverTimestamp, writeBatch } from "firebase/firestore"
import { firestore } from "@lib/firebase/client/db"
import ChatUserSearch, { StreamUser } from "@stream/components/ChatUserSearch"


const AddGroupMemberModal = ({ isOpen, closeModal, }: {
  isOpen: boolean
  closeModal: () => void
}) => {

  const [username, setUsername] =useState("")
  const [disabled, setDisabled] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<StreamUser[]>([])
  const [users, setUsers] = useState<StreamUser[]>([])
  const router = useRouter()
  const groupName = router.query


  const runUpdateGroup = async () => {
    // These id will come from stream and should be the username
    selectedUsers.map(async (u) => {
      let username = u.id
      try{
        const userDetails = (await getUserWithUsername(username))
        let {uid, groups, alpacaAccountId} = userDetails.data()
  
        if (groups.includes(groupName.groupName)){
          let err = new Error()
          err["reason"]="User already in group!"
          throw err
        } 
        // Update list for user
        updateUserData({uid: uid, updateData: {groups: [...groups, groupName.groupName]}})
        // Update investors for group
        const investorsRef = doc(firestore, `groups/${groupName.groupName}/investors/${username}`)
        const batch = writeBatch(firestore)
        batch.set(investorsRef, {
          isFounder: false,
          joinDate: serverTimestamp(),
          uid: uid,
          alpacaAccountId: alpacaAccountId,
        })
        await batch.commit()
        .then(()=>toast.success(`Added ${username} to ${groupName.groupName}`))
        closeModal()
  
      } catch(error){
        toast.error(`Failed to add user: ${error.reason}`)
        console.log(error.reason)
        closeModal()
      }
    })
  }

  return(
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      open={isOpen}
      className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur-xs"
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
              className="flex items-center justify-center space-x-4"
            >
              {<IoIosPeople />}
              <div className="text-xl font-medium text-center text-gray-900 leading-6">
                Add Member to Group
              </div>
            </Dialog.Title>
            <div className="mt-4">
              <p className="text-sm text-center text-gray-400">
                Type the username below
              </p>
            </div>
            <ChatUserSearch
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                users={users}
                setUsers={setUsers}
              />

            <div className="flex items-center justify-center mx-auto mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                onClick={async (e) => {
                  e.preventDefault()
                  await runUpdateGroup()
                }}
                disabled={disabled}
              >
                {!disabled ? "Add" : "Adding..."}
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
)
}

export default AddGroupMemberModal
