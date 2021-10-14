import React from "react"
import { Text, ScrollView } from "react-native"

import { createParam } from "app/navigation/use-param"
import type { PlaylistScreenProps } from "app/navigation/types"
import tw from "../lib/tailwind"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

export default function PlaylistScreen({ navigation, route }: PlaylistScreenProps) {
  const [id, setId] = useParam("id")

  return (
    <ScrollView style={tw`flex-1`}>
      <Text
        style={{
          ...tw`p-4 font-poppins-100 text-white text-2xl`,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
        }}
      >
        Poppins Thin
      </Text>

      <Text
        style={{
          ...tw`p-4 font-poppins-200 text-white text-2xl`,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
        }}
      >
        Poppins Extra Light
      </Text>

      <Text
        style={{
          ...tw`p-4 font-poppins-300 text-white text-2xl`,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
        }}
      >
        Poppins Light
      </Text>

      <Text
        style={{
          ...tw`p-4 font-poppins-400 text-white text-2xl`,
          // Note the quoting of the value for `fontFamily` here; it expects a string!
        }}
      >
        Poppins Regular
      </Text>

      <Text
        style={{
          ...tw`p-4 font-poppins-500 text-white text-2xl`,
        }}
      >
        Poppins Medium
      </Text>

      <Text
        style={{
          ...tw`p-4 text-white text-2xl font-poppins-600`,
        }}
      >
        Poppins Semi Bold
      </Text>

      <Text
        style={{
          ...tw`p-4 text-white text-2xl font-poppins-700`,
        }}
      >
        Poppins Bold
      </Text>

      <Text
        style={{
          ...tw`p-4 text-white text-2xl font-poppins-800`,
        }}
      >
        Poppins Extra Bold
      </Text>
    </ScrollView>
  )
}
