import { useAuth } from "app/hooks/useAuth"
import React, { useState, useEffect } from "react"
import { View, Text, Pressable } from "react-native"
import { getGroupDocsByName } from "app/lib/firebase/db/getGroupDocsByName"
import tw from "app/lib/tailwind"

const SelectGroupModal = ({ state, send }) => {
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
    <View style={tw`w-full `}>
      <View style={tw`items-center`}>
        {/** TODO Add a loader here  */}
        {groups?.map(group => (
          <Pressable
            style={tw`w-4/5 p-4 my-2  text-left bg-white shadow-md  transform rounded-2xl`}
            onPress={setSelectedGroup}
          >
            <View>
              <Text style={tw`text-xl`}>{group.name}</Text>
              <Text>{group.groupType}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SelectGroupModal
