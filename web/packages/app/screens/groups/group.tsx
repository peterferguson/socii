import React from "react"
import { Text, ScrollView } from "react-native"

import { createParam } from "app/navigation/use-param"
import type { GroupScreenProps } from "app/navigation/types"
import tw from "../../lib/tailwind"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

export default function GroupScreen({ navigation, route }: GroupScreenProps) {
  const [id, setId] = useParam("id")

  return (
    <ScrollView style={tw`flex-1`}>
      <Text
        style={tw`p-4 font-poppins-100 text-brand-black dark:text-brand-gray text-2xl`}
      >
        Poppins Thin
      </Text>
      <Text
        style={tw`p-4 font-poppins-200 text-brand-black dark:text-brand-gray text-2xl`}
      >
        Poppins Extra Light
      </Text>
      <Text
        style={tw`p-4 font-poppins-300 text-brand-black dark:text-brand-gray text-2xl`}
      >
        Poppins Light
      </Text>
      <Text
        style={tw`p-4 font-poppins-400 text-brand-black dark:text-brand-gray text-2xl`}
      >
        Poppins Regular
      </Text>
      <Text
        style={tw`p-4 font-poppins-500 text-brand-black dark:text-brand-gray text-2xl`}
      >
        Poppins Medium
      </Text>
      <Text
        style={tw`p-4 text-brand-black dark:text-brand-gray text-2xl font-poppins-600`}
      >
        Poppins Semi Bold
      </Text>
      <Text
        style={tw`p-4 text-brand-black dark:text-brand-gray text-2xl font-poppins-700`}
      >
        Poppins Bold
      </Text>
      <Text
        style={tw`p-4 text-brand-black dark:text-brand-gray text-2xl font-poppins-800`}
      >
        Poppins Extra Bold
      </Text>
      <Text
        style={tw`p-4 font-open-sans-300 text-brand-black dark:text-brand-gray text-2xl`}
      >
        {" "}
        Light
      </Text>
      <Text
        style={tw`p-4 font-open-sans-400 text-brand-black dark:text-brand-gray text-2xl`}
      >
        Open Sans Regular
      </Text>
      <Text
        style={tw`p-4 text-brand-black dark:text-brand-gray text-2xl font-open-sans-600`}
      >
        Open Sans Semi Bold
      </Text>
      <Text
        style={tw`p-4 text-brand-black dark:text-brand-gray text-2xl font-open-sans-700`}
      >
        {" "}
        Bold
      </Text>
      <Text
        style={tw`p-4 text-brand-black dark:text-brand-gray text-2xl font-open-sans-800`}
      >
        Open Sans Extra Bold
      </Text>
    </ScrollView>
  )
}
