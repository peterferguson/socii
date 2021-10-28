import React from "react"
import { Pressable, Button, View } from "react-native"
import { Text } from "react-native"
import tw from "../../lib/tailwind"

import { useRouter } from "app/navigation/use-router"
import { shadowStyle } from "../../utils/shadowStyle"

export default function GroupsScreen() {
  const router = useRouter()

  return (
    <>
      <Button
        onPress={() => {
          router.push("/groups/new")
        }}
        title="New group"
      />

      {[1, 2, 3, 4, 5].map((_, index) => (
        <Pressable
          key={index}
          onPress={() => {
            router.push(`/groups/${index + 1}`)
          }}
          style={tw`mt-4 flex items-center justify-center`}
        >
          <Text style={tw`text-brand-black dark:text-brand-gray`}>{`Group ${index + 1}`}</Text>
        </Pressable> 
      ))}

      <View style ={tw`items-center`}>
        <Pressable
          onPress={()=>{
           router.push(`/settings/`)
          }}
          style={{          
            ...tw`bg-blue-300 my-2 mx-4 w-1/2 flex flex-col justify-center items-center rounded-2xl sm:rounded-xl`,
            ...shadowStyle("md"),
          }}
          >   
          <Text style={{ ...tw`text-lg text-white` }}>Settings </Text>
          </Pressable>
        </View>
    </>
  )
}
