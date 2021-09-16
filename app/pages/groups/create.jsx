import { AmountOptionsRadioGroup } from "@components/AmountOptionsRadioGroup"
import CheckIcon from "@components/BackgroundCheck"
import { PrivacyOptionsRadioGroup } from "@components/PrivacyOptionsRadioGroup"
import { useAuth } from "@hooks"
import {
  groupDepositOptions,
  groupLumpSumOptions,
  groupPrivacyOptions,
} from "@lib/constants"
import { createGroup } from "@lib/firebase/client/db/createGroup"
import { groupNameExists } from "@lib/firebase/client/db/groupNameExists"
import debounce from "lodash/debounce"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiX } from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"

export default function Create() {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const router = useRouter()

  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [privacyOption, setPrivacyOption] = useState(groupPrivacyOptions[1])
  const [depositOption, setDepositOption] = useState(groupDepositOptions[1])
  const [lumpSumOption, setLumpSumOption] = useState(groupLumpSumOptions[1])
  const [isValidGroupName, setisValidGroupName] = useState(false)
  const [loading, setLoading] = useState(false)

  // TODO: Extract this and the username check into a single hook
  // TODO: Users not getting the correct feedback on group name creation
  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    setLoading(true)
    re.test(val) ? setGroupName(val) : setGroupName("")
    setisValidGroupName(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkGroupName(groupName), [groupName])

  // Hit the database for groupName match after each debounced change
  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkGroupName = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const empty = await groupNameExists(name)
        setisValidGroupName(empty)
        !empty && toast.error(`Sorry the group name ${name} is taken`)
        setLoading(false)
      }
    }, 500),
    []
  )

  return (
    <main className="flex flex-col items-center w-screen h-screen max-h-screen overflow-y-scroll bg-gray-100">
      <form className="w-full my-16 sm:w-2/3">
        <div className="px-4 py-3 mb-3 leading-tight text-gray-700 bg-white shadow-lg appearance-none rounded-t-3xl sm:rounded-xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto -mt-12 overflow-hidden text-white border-white rounded-full shadow-lg bg-brand border-[3px]">
            <HiOutlineUserGroup className="w-8 h-8 text-white" />
          </div>
          <div className="pt-4 pb-1 text-4xl font-bold text-center font-secondary">
            Create an Investment
          </div>
          <div className="pb-4 text-4xl font-bold text-center font-secondary">
            Group
          </div>
          <label className="ml-4 text-base font-bold font-secondary">
            Name
            <div className="flex flex-row">
              <input
                className="w-11/12 my-4 ml-3 mr-8 border rounded-lg appearance-none border-grey-200 shadow-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-tiny sm:text-base"
                type="text"
                placeholder="Investment Group Name"
                onChange={onChange}
              />
              <div
                className={`h-10 w-10 bg-none text-sm sm:text-tiny ${
                  isValidGroupName ? "text-brand btn-transition" : "text-red-400"
                } p-0.5 justify-center ml-[-4.5rem] mt-[1.45rem]`}
                onKeyDown={null}
              >
                {isValidGroupName ? (
                  <CheckIcon className="w-6" onClick={null} />
                ) : (
                  <FiX className="w-6 h-6" />
                )}
              </div>
            </div>
          </label>
          <label className="ml-4 text-base font-bold font-secondary">
            Short description
            <input
              className="flex w-11/12 my-4 ml-3 mr-8 border rounded-lg appearance-none border-grey-200 shadow-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-tiny sm:text-base"
              type="text"
              placeholder="Best active value/dividend/growth investment club around!"
              onChange={(e) => setGroupDescription(e.target.value)}
            />
          </label>
          <label className="mx-4 mt-4 text-base font-bold font-secondary">
            Group Privacy
            <PrivacyOptionsRadioGroup
              privacyOption={privacyOption}
              setPrivacyOption={setPrivacyOption}
            />
          </label>
          <label className="flex flex-col mx-4 mb-4 text-base font-bold font-secondary">
            Initial Lump-Sum
            <AmountOptionsRadioGroup
              AmountOptions={groupLumpSumOptions}
              amountOption={lumpSumOption}
              setAmountOption={setLumpSumOption}
              srLabel={"Initial Lump Sum Amount"}
            />
          </label>
          <label className="flex flex-col m-4 text-base font-bold font-secondary">
            Deposit Schedule
            {/* 
            // ! Legally the group members will have to ensure this balance is maintained.
            // ! All we can do is raise warnings when their average balance is below 
            // ! the cash holding of the group may not have enough 
            */}
            {/* <span className="pt-1 uppercase text-tiny text-emerald-400">
              (a monthly deposit so that all members of the group have enough to trade
              with)
            </span> */}
            <AmountOptionsRadioGroup
              AmountOptions={groupDepositOptions}
              amountOption={depositOption}
              setAmountOption={setDepositOption}
              srLabel={"Monthly Deposit Amount"}
            />
          </label>
          <button
            className="w-11/12 my-8 btn"
            onClick={(e) => {
              e.preventDefault()
              if (isValidGroupName) {
                createGroup(
                  user,
                  username,
                  groupName,
                  privacyOption,
                  depositOption,
                  lumpSumOption,
                  groupDescription
                )

                router.push(`/groups/${groupName}`)
              }
            }}
          >
            Create!
          </button>
        </div>
      </form>
    </main>
  )
}
