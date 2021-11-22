import { useAuth } from "app/hooks/useAuth"
import { getGroupDocsByName } from "app/lib/firebase/db/getGroupDocsByName"
import tw from "app/lib/tailwind"
import React, { useEffect, useState } from "react"
import { CenteredColumn } from "../Centered"
import ModalSelectButton from "./ModalSelectButton"

const SelectGroupModal = ({ send }) => {
  const { user } = useAuth()
  const userGroups = user && user.groups ? user.groups : []

  const [groups, setGroups] = useState(undefined)

  const setSelectedGroup = groupName => send("SELECT_GROUP", { groupName: groupName })

  useEffect(() => {
    const getGroupData = async () => {
      setGroups(
        (await getGroupDocsByName(userGroups)).docs.map(doc => {
          const { groupName, groupType, privacyOption, groupDescription } = doc.data()
          return {
            name: groupName,
            groupType,
            privacyOption: privacyOption.name,
            description: groupDescription,
          }
        })
      )
    }

    if (userGroups?.length) getGroupData()
  }, [userGroups])

  return (
    <CenteredColumn style={tw`h-full justify-start pt-12`}>
      {/** TODO Add a loader here  */}
      {groups?.map(group => (
        <ModalSelectButton
          onPress={setSelectedGroup}
          Icon={null} // TODO Add an icon for the group
          title={group.name}
          key={group.name}
          description={group.groupType}
        />
      ))}
    </CenteredColumn>
  )
}

export default SelectGroupModal
