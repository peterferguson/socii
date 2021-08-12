import CheckIcon from "@components/BackgroundCheck"
import { RadioGroup } from "@headlessui/react"
import { getGroupDocsByName } from "@lib/firebase/client/db/getGroupDocsByName"
import { firestore } from "@lib/firebase/client/firebase"
import React, { useState, useEffect } from "react"

export default function GroupSelectorRadioGroup({ groupNames, send, className = "" }) {
  const [groupSelected, setGroupSelected] = useState(null)
  const [groups, setGroups] = useState(undefined)

  const setSelectedGroup = (group) => {
    setGroupSelected(group.name)
    send("SELECT_GROUP", { groupName: group.name })
  }

  useEffect(() => {
    const getGroupData = async () => {
      setGroups(
        (await getGroupDocsByName(groupNames)).docs.map((doc) => {
          const { groupName, type, privacyOption, groupDescription } = doc.data()
          return {
            name: groupName,
            type,
            privacyOption: privacyOption.name,
            description: groupDescription,
          }
        })
      )
    }

    if (groupNames?.length) getGroupData()
  }, [groupNames])

  return (
    <div className={`w-11/12 pl-8 flex-grow max-w-md sm:max-w-none ${className}`}>
      <RadioGroup value={groupSelected} onChange={setSelectedGroup}>
        <RadioGroup.Label className="sr-only">
          Select an Investment Group
        </RadioGroup.Label>
        <div className="flex-col flex-grow space-x-0 sm:space-x-8 space-y-2 sm:space-y-0 sm:flex sm:flex-row">
          {groups?.map((group) => (
            <RadioGroup.Option
              key={group.name}
              value={group}
              className={({ active }) => `bg-white relative rounded-lg shadow-md px-4 
                py-2 cursor-pointer focus:outline-none flex-1
                ${
                  active
                    ? "ring-2 ring-offset-2 ring-offset-light-blue-300 ring-brand ring-opacity-60"
                    : ""
                }
                `}
            >
              {({ checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center content-between">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? "text-brand" : "text-gray-900"
                          }`}
                        >
                          {group.name}
                        </RadioGroup.Label>
                        <div className="flex-grow" />
                        <RadioGroup.Description
                          as="span"
                          className={`flex flex-col ${
                            checked ? "text-light-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span className="text-tiny overflow-ellipsis">
                            {group.description}
                          </span>
                          <span className="p-1 text-center text-white bg-teal-200 rounded-full text-tiny font-secondary">
                            {group.privacyOption} Group
                          </span>
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
