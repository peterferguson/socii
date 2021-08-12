import CheckIcon from "@components/BackgroundCheck"
import { useAuth } from "@hooks/useAuth"
import { usernameExists } from "@lib/firebase/client/db/usernameExits"
import { createAccount } from "@lib/firebase/client/functions"
import debounce from "lodash/debounce"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiX } from "react-icons/fi"

export default function Username(props) {
  const { user } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [isValidUsername, setisValidUsername] = useState(false)
  const [loading, setLoading] = useState(false)

  // TODO: Extract this and the groupName check into a single hook
  const onChange = (e) => {
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    setLoading(true)
    re.test(val) ? setUsername(val) : setUsername("")
    setisValidUsername(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkUsername(username), [username])

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (name) => {
      if (name.length >= 3) {
        const empty = await usernameExists(username)
        setisValidUsername(empty)
        !empty && toast.error(`Sorry the username ${name} is taken`)
        setLoading(false)
      }
    }, 500),
    []
  )

  const runAccountCreation = async (e, user, username) => {
    e.preventDefault()
    console.log(user, username)
    const { body } = await createAccount(user, username)
    if (body?.status === "success") {
      toast.success(body?.message)
      router.push(`/user/${username}`)
    } else {
      toast.error(`Sorry there was a problem! ${body?.message}`)
    }
  }

  return (
    <main className="flex items-center justify-center w-full">
      <form className="w-full my-16 sm:w-2/3">
        <div className="px-4 py-3 m-4 leading-tight text-gray-700 border border-gray-300 appearance-none bg-brand bg-opacity-10 rounded-xl sm:mb-3 focus:outline-none focus:bg-gray-50 focus:border-gray-500">
          <div className="p-4 text-xl font-bold font-secondary">Choose a username</div>
          <div className="flex w-11/12 px-4 py-3 mb-3 ml-4 leading-tight text-gray-700 bg-white border rounded-lg appearance-none border-brand-dark border-opacity-30 focus:outline-none active:border-opacity-100 active:border-brand focus:border-opacity-100 focus:border-brand">
            <input
              className="flex-grow w-2/3 p-0 bg-white border-none appearance-none focus:ring-0 focus:outline-none sm:w-full"
              type="text"
              placeholder="ElonMuskett"
              onChange={onChange}
            />
            <div
              className={`bg-white text-sm sm:text-tiny align-middle ${
                isValidUsername ? "text-brand btn-transition" : "text-red-400"
              }`}
              onKeyDown={null}
            >
              {isValidUsername ? (
                <CheckIcon className="w-6" onClick={null} />
              ) : (
                <FiX className="w-6 h-6" />
              )}
            </div>
          </div>
          <button
            className="w-11/12 my-4 btn"
            onClick={(e) => isValidUsername && runAccountCreation(e, user, username)}
          >
            Choose!
          </button>
        </div>
      </form>
    </main>
  )
}
