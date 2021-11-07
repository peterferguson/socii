import {CenteredColumn} from "../Centered"
import HeaderText from "../Text/HeaderText"
import tw from "../../lib/tailwind"
import { View, FlatList, Text, Image, useWindowDimensions } from "react-native"
import { useEffect } from "react"

const onboardingData = [
  {
    id: "onboarding-screen-1",
    title: "Welcome to the socii!",
    description: "A totally new social investing experience!",
    image: require("../../../expo/assets/revenue.svg"),
  },
  {
    id: "onboarding-screen-2",
    title: "",
    description: "This is a description of the onboarding screen.",
    image: require("../../../expo/assets/manage_chats.svg"),
  },
  {
    id: "onboarding-screen-3",
    title: "Welcome to the app!",
    description: "This is a description of the onboarding screen.",
    image: require("../../../expo/assets/public_discussion.svg"),
  },
  {
    id: "onboarding-screen-1",
    title: "Welcome to the socii!",
    description: "A totally new social investing experience!",
    image: require("../../../expo/assets/people_search.svg"),
  },
  {
    id: "onboarding-screen-2",
    title: "",
    description: "This is a description of the onboarding screen.",
    image: require("../../../expo/assets/add_friends.svg"),
  },
]

const Onboarding = () => {
  return (
    <CenteredColumn>
      <FlatList
        data={onboardingData}
        renderItem={OnboardingItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </CenteredColumn>
  )
}

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions()
  useEffect(() => console.log(tw`flex-[0.4]`), [])
  return (
    <View style={tw.style(`flex-[0.6]`, { width, resizeMode: "contain" })}>
      <Image source={item.image} style={tw`flex-[0.4]`} />
      <HeaderText text={item.title} />
      <Text>{item.description}</Text>
    </View>
  )
}

export default Onboarding
