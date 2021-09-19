// // TODO
// - Add group details cards
// - decide on displayed content
// - general activity feed
// - link messages to stream?
// - break into components to clean code
// - deal with navigation to the page or how to find new groups

import { getGroupPrivacyOption } from "@lib/firebase/client/db/getGroupPrivacyOption"
import { tw } from "@utils/tw"
import React, { useEffect, useState } from "react"

const NonGroupMemberView = ({ groupName }) => {
  const [, setPrivacyOption] = useState()

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getGroupPrivacyOption(groupName, setPrivacyOption)
    return () => unsubscribe
  }, [groupName])

  return (
    <div className="flex flex-col w-full h-full mt-0 bg-gray-50 sm:mt-8">
      <h2 className="pl-2 text-2xl text-gray-500 font-primary">Group Details</h2>
      Founded: Members: Location: ...
      <h2 className="pl-2 text-2xl text-gray-500 font-primary">Portfolio Details</h2>
      <div>
        <div
          className={tw(
            "w-4/5 p-10 mx-auto text-center border-4 shadow-2xl cursor-pointer grid place-items-center sm:my-auto",
            `border-pink bg-white bg-opacity-70`,
            "rounded-xl space-y-5"
          )}
        >
          <h1
            className={tw(
              `text-4xl font-semibold uppercase text-pink transition duration-500`
            )}
          >
            This Group Is Private
          </h1>
          <h2 className="text-xl text-gray-700 transition duration-500">
            If you are interested in contacting the group, please enter a message below.
          </h2>
          <input
            type="text"
            name="price"
            className="block w-full pr-12 appearance-none border-brand focus:ring-brand-dark focus:border-teal-500 pl-7 sm:text-sm rounded-md"
            placeholder="your message here"
            //onChange={(e) => setPrice(e.target.value)}
          />
          <button
            type="button"
            className="inline-flex justify-center px-2 py-2  mx-2 text-blue-800 bg-blue-100 border border-transparent sm:mx-8 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            //onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <h2 className="pl-2 text-2xl text-gray-500 font-primary">Activity</h2>
    </div>
  )
}

export default NonGroupMemberView
