import React from "react"
import { Pressable, Button } from "react-native"
import { Text } from "react-native"
import tw from "../../lib/tailwind"

import { useRouter } from "app/navigation/use-router"

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
    </>
  )
}
