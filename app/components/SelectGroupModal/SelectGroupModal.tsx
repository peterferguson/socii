import GroupSelectorRadioGroup from "@components/GroupSelector"
import { Dialog } from "@headlessui/react"
import { useAuth } from "@hooks/useAuth"
import React from "react"

const SelectGroupModal = ({ send }) => {
  const { user } = useAuth()
  const userGroups = user && user.groups ? user.groups : []
  return (
    <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
      <Dialog.Title
        as="h3"
        className="pb-4 text-lg font-medium text-gray-900 font-primary"
      >
        Select a group to invest with:
      </Dialog.Title>
      <div className="p-2 mt-2">
        {/** TODO Add a loader here  */}
        {userGroups && <GroupSelectorRadioGroup groupNames={userGroups} send={send} />}
      </div>
    </div>
  )
}

export default SelectGroupModal
