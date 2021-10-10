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

const AddGroupMemberModal = ({open}) => {
  
  const [username, setUsername] =useState("")
  const [disabled, setDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(Boolean)
  const router = useRouter()
  const groupName = router.query

  useEffect(()=>{
    if (open) setIsOpen(open)
  }, [open])
  
  //TODO - replace with user search function
  /////////////////////////////////////
  const onChange = (e) => {
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    re.test(val) ? setUsername(val) : setUsername("")
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkUsername(username), [username])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const empty = await usernameExists(username)
        empty && toast.error(`The username ${name} doesn't exist`)
      }
    }, 1000),
    [username]
  )
  /////////////////////////////////////

  const runUpdateGroup = async (username) => {

    // Update list for user
    const userDetails = (await getUserWithUsername(username))
    let {uid, groups} = userDetails.data()
    updateUserData({uid: uid, updateData: {groups: [...groups, groupName.groupName]}}).then((r)=>toast.success(`Added ${username} to ${groupName.groupName}`))
    // Update investors for group

  }
  
  return(
    <div >
    <Dialog 
      open={isOpen} 
      onClose={()=>setIsOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto backdrop-filter backdrop-blur-lg" 
    >
      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
        <Dialog.Title className="pb-4 text-lg font-medium text-gray-900 font-primary">
            Enter a username to add!
        </Dialog.Title>
        <div className="mt-2">
          <input
            type="text"
            name="username"
            id="username"
            className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
            placeholder="Elonmusket"
             onChange={onChange}
          />
        </div>
      </div>
      <button 
        type="button"
        className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        onClick={async (e) => {
          e.preventDefault()
          await runUpdateGroup(username)
        }}
        disabled={disabled}
      >
        {!disabled ? "Update" : "Creating..."}
      </button>
      </Dialog>
      </div>
  
)
}

export default AddGroupMemberModal

