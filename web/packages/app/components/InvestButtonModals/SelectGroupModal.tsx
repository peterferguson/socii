
import { useAuth } from "../../hooks/useAuth"
import React, { useState, useEffect } from "react"
import { View, Text, Pressable } from "react-native"
import { getGroupDocsByName } from "../../lib/firebase/db/getGroupDocsByName"
import tw from "../../lib/tailwind"

const SelectGroupModal = ({ state, send }) => {
  console.log("in select groupppppp");
  
  const { user } = useAuth()
  const userGroups = user && user.groups ? user.groups : []

  const [groupSelected, setGroupSelected] = useState(null)
  const [groups, setGroups] = useState(undefined)

  const setSelectedGroup = (group) => {
    console.log(("sendinggroup"));
    setGroupSelected(group.name)
    send("SELECT_GROUP", { groupName: group.name })
  }

  useEffect(() => {
    const getGroupData = async () => {
      setGroups(
        (await getGroupDocsByName(userGroups)).docs.map((doc) => {
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
    <View style={tw`w-full overflow-y-scroll align-middle`}>
      <View style={tw`items-center`}>
        {/** TODO Add a loader here  */}
        {groups?.map((group)=>(
          <Pressable 
            style={tw`w-4/5 p-4 my-2 overflow-y-scroll text-left bg-white shadow-md  transform rounded-2xl`}
            onPress={setSelectedGroup}
          >
            <View >           
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
