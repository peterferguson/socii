import GroupSelectorRadioGroup from "@components/GroupSelector"
import { InvestButtonModalContainer } from "@components/InvestButtonModalContainer"
import { Dialog } from "@headlessui/react"
import { useAuth } from "@hooks/useAuth"
import React from "react"

const SelectGroupModal = ({ state, send }) => {
  const { userGroups } = useAuth()

  return (
    <InvestButtonModalContainer
      open={state.matches("active.chooseGroup")}
      onClose={() => send("CLOSE")}
    >
      <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl transition-all transform rounded-2xl">
        <Dialog.Title
          as="h3"
          className="pb-4 text-lg font-medium text-gray-900 font-primary"
        >
          Select a group to invest with:
        </Dialog.Title>
        <div className="mt-2">
          {/** TODO Add a loader here  */}
          {userGroups && (
            <GroupSelectorRadioGroup groupNames={userGroups} send={send} />
          )}
        </div>
        <div className="flex mt-4">
          <div className="flex-grow" />
          <button
            type="button"
            className="justify-center flex-none px-4 py-2 text-sm font-medium text-teal-900 bg-teal-100 border border-transparent \ rounded-md hover:bg-teal-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500"
            onClick={() => {}}
          >
            Yes, Lets go! 🚀
          </button>
        </div>
      </div>
    </InvestButtonModalContainer>
  )
}

export default SelectGroupModal
