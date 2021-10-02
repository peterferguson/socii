//TODO
  // - Improve input method to scale for multiple fields
  // - Add links to rest of fields, currently only username updated 
  // - Also update user doc and other apps relying on username

import { useAuth } from "@hooks/useAuth"
import React, { useCallback, useEffect, useState } from "react"
import debounce from "lodash/debounce"
import { usernameExists } from "@lib/firebase/client/db/index"
import toast from "react-hot-toast"
import { FiX } from "react-icons/fi"
import CheckIcon from "@components/BackgroundCheck"
import { updateUserData } from "@lib/firebase/client/functions"
import { tw } from "@utils/tw"
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@lib/firebase/client/auth"
import { getUsernameWithEmail } from "@lib/firebase/client/db/getUsernameWithEmail"

export default function Settings() {
  const { user } = useAuth()
  const [disabled, setDisabled] = useState(false)
  const [username, setUsername] = useState("")
  const [isValidUsername, setisValidUsername] = useState(false)
  const [loading, setLoading] = useState(false)
  const [retrieveEmail, setRetrieveEmail] = useState(null)
  const [email, setEmail] = useState(null)

  useEffect(()=>{
    if (retrieveEmail){
      const getEmail= async () => {
        const { user: rawUser } = await signInWithPopup(auth, new GoogleAuthProvider())
        setEmail(user.email)
      }
      getEmail()
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[retrieveEmail])

  useEffect(()=>{
    if(email){
      // check if email is used elsewhere, update if available
      getUsernameWithEmail(email).then((r)=> {
        if(r){
          toast.error(`Sorry the email ${email} is taken`)
        } else {
          runUpdateEmail( user, email )
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[email])

  const onChange = (e) => {
    const val = e.target.value
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
    setLoading(true)
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
        setisValidUsername(empty)
        !empty && toast.error(`Sorry the username ${name} is taken`)
        setLoading(false)
      }
    }, 500),
    [username]
  )

  //TODO less repetitive way where all fields are sent in object
  const runUpdateUsername = async (user, username) => {
    updateUserData({uid: user.uid, updateData: {username: username}}).then((r)=>toast.success(`updated username to ${username}`))
  }
  const runUpdateEmail = async (user, email) => {
    updateUserData({uid: user.uid, updateData: {email: email}}).then((r)=>toast.success(`updated email to ${email}`))
  }

  return (
    <div >
      <div>
        <div className="flex flex-col px-4 md:gap-6">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium text-gray-900 leading-6">Profile</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you
                    share.
                  </p>
                  <p className="mt-1 text-sm font-semibold text-pink-300">
                  You can update your username for now.. the other options will come soon  - keep an eye on our social media for future releases!
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="flex flex-row rounded-md shadow-sm">
                  <div className="text-gray-700 bg-white border rounded-lg border-brand-dark border-opacity-30 focus:outline-none active:border-opacity-100 active:border-brand focus:border-opacity-100 focus:border-brand">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                      placeholder="Elonmusket"
                      onChange={onChange}
                    />
                  </div>
                    <div className="justify-center">
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
                      type="button"
                      className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      onClick={async (e) => {
                        e.preventDefault()
                        isValidUsername && (await runUpdateUsername(user, username))
                      }}
                      disabled={disabled}
                    >
                      {!disabled ? "Update" : "Creating..."}
                    </button>
                  </div>
                </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Website
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                      http://
                    </span>
                    <input
                      type="text"
                      name="company-website"
                      id="company-website"
                      className="flex-1 block w-full border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full mt-1 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="you@example.com"
                        defaultValue={""}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="flex items-center mt-1">
                      <span className="inline-block w-12 h-12 overflow-hidden rounded-full bg-gray-50">
                        <svg
                          className="w-full h-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="px-3 py-2 ml-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm leading-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="text-center space-y-1">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium text-indigo-600 bg-white cursor-pointer rounded-md hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
        </div>
      </div>

      <div className="py-4">
      <div className="flex flex-col px-4 md:gap-6">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium text-gray-900 leading-6">Personal Information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter you personal and contact details here.
                  </p>
                  <p className="mt-1 text-sm font-semibold text-pink-300">
                  You can update your email for now.. the other options will come soon - keep an eye on our social media for future releases!
                  </p>
                </div>
              </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <button
            type="submit"
            className={tw(
              "relative w-full py-1 px-2 gradient-flow text-white text-xs md:text-xs",
              "rounded-2xl border-1",
              "outline-none group-hover:ring-0 group-hover:border-transparent leading-0",
              "umami--click--waitlist-submit-button"
            )}
            onClick={async (e) => {
              setRetrieveEmail(true)
            }}
          >
            Change Email
          </button>
                      </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country / Region
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="block w-full mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        className="block w-full mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full mt-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex flex-col px-4 md:gap-6">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium text-gray-900 leading-6">Notifications</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Decide which communications you&apos;d like to receieve and how.
                    </p>
                    <p className="mt-1 text-sm font-semibold text-pink-300">
                      This section will be enabled soon.
                    </p>
                  </div>
                </div>

                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">
                      By Email
                    </legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="comments"
                            className="font-medium text-gray-700"
                          >
                            Comments
                          </label>
                          <p className="text-gray-500">
                            Get notified when someones posts a comment on a posting.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="candidates"
                            className="font-medium text-gray-700"
                          >
                            Candidates
                          </label>
                          <p className="text-gray-500">
                            Get notified when a candidate applies for a job.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="offers" className="font-medium text-gray-700">
                            Offers
                          </label>
                          <p className="text-gray-500">
                            Get notified when a candidate accepts or rejects an offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div>
                      <legend className="text-base font-medium text-gray-900">
                        Push Notifications
                      </legend>
                      <p className="text-sm text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block ml-3 text-sm font-medium text-gray-700"
                        >
                          Everything
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="push-email"
                          className="block ml-3 text-sm font-medium text-gray-700"
                        >
                          Same as email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="push-nothing"
                          className="block ml-3 text-sm font-medium text-gray-700"
                        >
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

          </div>
      </div>

    </div>
  )
}
