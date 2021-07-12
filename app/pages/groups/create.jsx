import CheckIcon from "@components/BackgroundCheck"
import { RadioGroup } from "@headlessui/react"
import {
    currencyIcons,
    groupDepositOptions,
    groupLumpSumOptions,
    groupPrivacyOptions
} from "@lib/constants"
import { arrayUnion, firestore, serverTimestamp } from "@lib/firebase"
import { useAuth, useLocalCurrency } from "@lib/hooks"
import debounce from "lodash/debounce"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiX } from "react-icons/fi"
import { HiOutlineUserGroup } from "react-icons/hi"

export default function Create() {
  const { user, username } = useAuth()
  const router = useRouter()

  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [privacyOption, setPrivacyOption] = useState(groupPrivacyOptions[1])
  const [depositOption, setDepositOption] = useState(groupDepositOptions[1])
  const [lumpSumOption, setLumpSumOption] = useState(groupLumpSumOptions[1])
  const [isValidGroupName, setisValidGroupName] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // Only set form value if length is < 3 OR it passes regex
    if (val.length >= 3) {
      setGroupName(val)
      setLoading(false)
      setisValidGroupName(false)
    } else {
      setGroupName("")
      setisValidGroupName(false)
    }

    if (re.test(val)) {
      setGroupName(val)
      setLoading(true)
      setisValidGroupName(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkGroupName(groupName), [groupName])

  // Hit the database for groupName match after each debounced change
  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkGroupName = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const nameQuery = firestore.collection("groups").where("groupName", "==", name)

        const { empty } = await nameQuery.get()

        setisValidGroupName(empty)
        if (!empty) {
          toast.error(`Sorry the group name ${name} is taken`)
        }
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
          <label className="ml-4 font-bold text-md font-secondary">
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
          <label className="ml-4 font-bold text-md font-secondary">
            Short description
            <input
              className="flex w-11/12 my-4 ml-3 mr-8 border rounded-lg appearance-none border-grey-200 shadow-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-tiny sm:text-base"
              type="text"
              placeholder="Best active value/dividend/growth investment club around!"
              onChange={(e) => setGroupDescription(e.target.value)}
            />
          </label>
          <label className="mx-4 mt-4 font-bold text-md font-secondary">
            Group Privacy
            <PrivacyOptions
              privacyOption={privacyOption}
              setPrivacyOption={setPrivacyOption}
            />
          </label>
          <label className="flex flex-col mx-4 mb-4 font-bold text-md font-secondary">
            Initial Lump-Sum
            <AmountOptions
              AmountOptions={groupLumpSumOptions}
              amountOption={lumpSumOption}
              setAmountOption={setLumpSumOption}
              srLabel={"Initial Lump Sum Amount"}
            />
          </label>
          <label className="flex flex-col m-4 font-bold text-md font-secondary">
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
            <AmountOptions
              AmountOptions={groupDepositOptions}
              amountOption={depositOption}
              setAmountOption={setDepositOption}
              srLabel={"Monthly Deposit Amount"}
            />
          </label>
          <button
            className="w-11/12 my-8 btn"
            onClick={(e) =>
              isValidGroupName
                ? createGroup(
                    e,
                    router,
                    user,
                    username,
                    groupName,
                    privacyOption,
                    depositOption,
                    lumpSumOption,
                    groupDescription
                  )
                : null
            }
          >
            Create!
          </button>
        </div>
      </form>
    </main>
  )
}

// TODO: Add dropdown for mobile view with input values also
function AmountOptions({
  className,
  AmountOptions,
  amountOption,
  setAmountOption,
  srLabel,
}) {
  const [localCurrency] = useLocalCurrency()
  const LocalCurrencyIcon = currencyIcons[localCurrency].icon
  return (
    <div className={`w-11/12 mt-4 flex-grow max-w-md sm:max-w-none ${className}`}>
      <RadioGroup value={amountOption} onChange={setAmountOption}>
        <RadioGroup.Label className="sr-only">{srLabel}</RadioGroup.Label>
        <div className="flex-col flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 \ sm:flex sm:flex-row">
          {AmountOptions.map((option) => (
            <RadioGroup.Option
              key={option.amount}
              value={option}
              className={({ active }) =>
                `${
                  active
                    ? "ring-2 ring-offset-2 ring-offset-light-blue-300 \
                         ring-brand ring-opacity-60"
                    : ""
                }
                     bg-white relative rounded-lg shadow-md px-4 py-2 cursor-pointer \
                     focus:outline-none flex-1`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium text-lg sm:text-md ${
                            checked ? "text-brand" : "text-gray-900"
                          }`}
                        >
                          {currencyIcons[localCurrency].text}
                          {option.amount}
                          {/* <LocalCurrencyIcon className="w-4 h-4 mt-1.5" /> */}
                          {/* <span className="text-lg">{option.amount}</span> */}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-brand">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

function PrivacyOptions({ className, privacyOption, setPrivacyOption }) {
  return (
    <div className={`w-11/12 ml-4 mt-4 flex-grow max-w-md sm:max-w-none ${className}`}>
      <RadioGroup value={privacyOption} onChange={setPrivacyOption}>
        <RadioGroup.Label className="sr-only">Privacy option</RadioGroup.Label>
        <div className="flex-col flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 sm:flex sm:flex-row">
          {groupPrivacyOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active }) =>
                `bg-white relative rounded-lg shadow-md border border-gray-200 px-5 py-4 cursor-pointer \
              focus:outline-none flex-1
              ${
                active
                  ? "ring-2 ring-offset-2 ring-offset-light-blue-300 \
                       ring-brand ring-opacity-60 border-none"
                  : ""
              }`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-brand" : "text-gray-900"
                          }`}
                        >
                          {option.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-black" : "text-gray-500"
                          }`}
                        >
                          <span>{option.description}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-brand">
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

const createGroup = async (
  e,
  router,
  user,
  username,
  groupName,
  privacyOption,
  depositOption,
  lumpSumOption,
  groupDescription
) => {
  e.preventDefault()

  // TODO: Need to fix rules to allow user creation. (userGroupRef isn't accessible)

  const userGroupRef = firestore.collection("users").doc(user.uid)
  const groupRef = firestore.collection("groups").doc(groupName)
  const investorsRef = groupRef.collection("investors").doc(username)

  const batch = firestore.batch()

  batch.update(userGroupRef, { groups: arrayUnion(groupName) })
  batch.set(groupRef, {
    groupDescription,
    groupName,
    privacyOption,
    groupType: "", // TODO: Implement group types (dividend/active/value/growth)
    cashBalance: depositOption.amount + lumpSumOption.amount, //TODO: Add this to the payment ledger
    joinFee: lumpSumOption.amount,
    membershipFee: depositOption.amount,
    startDate: serverTimestamp(),
    investorCount: 1, // TODO: Increment this on addition of new investors
  })
  batch.set(investorsRef, { isFounder: true, joinDate: serverTimestamp() })
  await batch.commit()

  // Imperative navigation after doc is set
  router.push(`/groups/${groupName}`)
}
