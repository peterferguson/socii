import { Dimensions, FlatList, Image, View, Text } from "react-native"
import { SvgProps } from "react-native-svg"
import { Socii } from ".."
import tw from "../../lib/tailwind"
import { CenteredColumn } from "../Centered"
import HeaderText from "../Text/HeaderText"
import {
  PeopleSearch,
  PublicDiscussion,
  AddFriends,
  ManageChats,
  Revenue,
} from "./assets"

interface OnboardingItemData {
  id: string
  title: string
  description: string
  image?: any
  Component?: React.FC<SvgProps>
}

const onboardingData: OnboardingItemData[] = [
  {
    id: "onboarding-screen-0",
    title: "Welcome to the socii!",
    description: "A totally new social investing experience!",
    Component: props => <Socii {...props} height={200} width={200} />,
  },
  {
    id: "onboarding-screen-1",
    title: "A new way to learn investing!",
    description: "A totally new social investing experience!",
    Component: props => <Revenue {...props} />,
  },
  {
    id: "onboarding-screen-2",
    title: "",
    description: "This is a description of the onboarding screen.",
    Component: props => <PublicDiscussion {...props} />,
  },
  {
    id: "onboarding-screen-3",
    title: "Welcome to the app!",
    description: "This is a description of the onboarding screen.",
    Component: props => <PeopleSearch {...props} />,
  },
  {
    id: "onboarding-screen-4",
    title: "Welcome to the socii!",
    description: "A totally new social investing experience!",
    Component: props => <ManageChats {...props} />,
  },
  {
    id: "onboarding-screen-5",
    title: "Add Friends",
    description: "Create a group by simply adding friends to a chat!",
    Component: props => <AddFriends {...props} />,
  },
]

const width = Dimensions.get("window").width

const OnboardingItem = ({ item }: { item: OnboardingItemData }) => {
  return (
    <CenteredColumn style={tw.style(`-mt-32`, { flex: 1, width })}>
      {item.Component && <item.Component height={width} width={width * 0.9} />}
      <CenteredColumn style={tw`mt-12`}>
        <HeaderText
          text={item.title}
          style={tw`font-poppins-700 text-3xl text-center text-brand-black dark:text-brand-white`}
        />
        <Text
          style={tw`font-poppins-300 mt-2 text-center text-brand-black dark:text-brand-white`}
        >
          {item.description}
        </Text>
      </CenteredColumn>
    </CenteredColumn>
  )
}

const Onboarding = () => {
  return (
    <CenteredColumn style={tw`flex-1 bg-white dark:bg-brand-black`}>
      <FlatList
        data={onboardingData}
        renderItem={OnboardingItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </CenteredColumn>
  )
}

export default Onboarding
