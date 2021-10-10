import { useEffect, useState, useCallback, useRef, Fragment } from "react"
import debounce from "lodash/debounce"
import { Dialog, Transition } from "@headlessui/react"
import React from "react"
import { usernameExists } from "@lib/firebase/client/db/usernameExists"
import toast from "react-hot-toast"
import { InvisibleButton } from "@components/InvisibleButton"
import { updateUserData } from "@lib/firebase/client/functions"
import { getUserWithUsername } from "@lib/firebase/client/db"
import { useRouter } from "next/router"
import { IoIosPeople } from "react-icons/io"

const AddGroupMemberModal = ({ isOpen, closeModal, }: {
  isOpen: boolean
  closeModal: () => void
}) => {

  const [username, setUsername] =useState("")
  const [disabled, setDisabled] = useState(false)
  const [isValidUsername, setisValidUsername] = useState(false)
  const router = useRouter()
  const groupName = router.query

  // //TODO - replace with user search function
 /////////////////////////////////////
  const onChange = (e) => {
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    re.test(val) ? setUsername(val) : setUsername("")
    setisValidUsername(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkUsername(username), [username])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const empty = await usernameExists(username)
        setisValidUsername(!empty)
        toast.dismiss()
        empty ? toast.error(`The username ${name} doesn't exist`)
          : toast.success(`Username ${name} is valid`)
      }
    }, 1000),
    [username]
  )
 /////////////////////////////////////

  const runUpdateGroup = async (username) => {
    try{
      const userDetails = (await getUserWithUsername(username))
      let {uid, groups} = userDetails.data()

      if (groups.includes(groupName.groupName)){
        let err = new Error()
        err["reason"]="User already in group!"
        throw err
      } 
        // Update list for user
      updateUserData({uid: uid, updateData: {groups: [...groups, groupName.groupName]}})
      .then((r)=>toast.success(`Added ${username} to ${groupName.groupName}`))
      // Update investors for group
      //TODO

      closeModal()
    
    } catch(error){
      toast.error(`Failed to add user: ${error.reason}`)
      closeModal()
    }
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
            <input
                type="text"
                name="username"
                id="username"
                className="flex-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Elonmusket"
                onChange={onChange}
              />

            <div className="flex items-center justify-center mx-auto mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                onClick={async (e) => {
                  e.preventDefault()
                  isValidUsername && (await runUpdateGroup(username))
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

//const AddGroupMemberModal = ({open}) => {
// const [username, setUsername] =useState("")
// const [disabled, setDisabled] = useState(false)
// const [isOpen, setIsOpen] = useState(Boolean)
// const router = useRouter()
// const groupName = router.query

// useEffect(()=>{
//   if (open) setIsOpen(open)
// }, [open])

// //TODO - replace with user search function
// /////////////////////////////////////
// const onChange = (e) => {
//   const val = e.target.value
//   const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
//   re.test(val) ? setUsername(val) : setUsername("")
// }

// // eslint-disable-next-line react-hooks/exhaustive-deps
// useEffect(() => checkUsername(username), [username])

// // eslint-disable-next-line react-hooks/exhaustive-deps
// const checkUsername = useCallback(
//   debounce(async (name) => {
//     if (name.length >= 3) {
//       const empty = await usernameExists(username)
//       empty && toast.error(`The username ${name} doesn't exist`)
//     }
//   }, 1000),
//   [username]
// )
// /////////////////////////////////////

// const runUpdateGroup = async (username) => {

//   // Update list for user
//   const userDetails = (await getUserWithUsername(username))
//   let {uid, groups} = userDetails.data()
//   updateUserData({uid: uid, updateData: {groups: [...groups, groupName.groupName]}}).then((r)=>toast.success(`Added ${username} to ${groupName.groupName}`))
//   // Update investors for group

// }
///////////////////////
// <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
// <Dialog.Title className="pb-4 text-lg font-medium text-gray-900 font-primary">
//     Enter a username to add!
// </Dialog.Title>
// <div className="mt-2">
//   <input
//     type="text"
//     name="username"
//     id="username"
//     className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
//     placeholder="Elonmusket"
//      onChange={onChange}
//   />
// </div>
// </div>
// <button 
// type="button"
// className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
// onClick={async (e) => {
//   e.preventDefault()
//   await runUpdateGroup(username)
// }}
// disabled={disabled}
// >
// {!disabled ? "Update" : "Creating..."}
// </button>