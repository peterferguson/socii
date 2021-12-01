import { DrawerActions, useNavigation } from "@react-navigation/native"
import {
  CenteredColumn,
  GroupSummaryCard,
  Paginator,
  RoundButton,
} from "app/components"
import { useAuth } from "app/hooks/useAuth"
import tw from "app/lib/tailwind"
import React, { useMemo, useEffect } from "react"
import { FlatList, Text, View } from "react-native"
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { CreateNewGroupCard } from "../../components/CreateNewGroupCard"

const GroupPortfolios = (): JSX.Element => {
  const { user } = useAuth()
  const groups = user?.groups || []
  const data = [...groups, "_addNewGroupPlaceHolder"]

  const navigation = useNavigation()

  return groups.length > 0 ? (
    <CenteredColumn style={tw`mx-4 mt-4`}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(groupName, index) => `group-${index}-${groupName}`}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 1}
        renderItem={({ item: groupName }) =>
          groupName === "_addNewGroupPlaceHolder" ? (
            <CreateNewGroupCard />
          ) : (
            <GroupSummaryCard groupName={groupName} />
          )
        }
      />
    </CenteredColumn>
  ) : (
    <CenteredColumn style={tw`h-full justify-start`}>
      <CenteredColumn style={tw`h-1/5 w-2/3 my-2`}>
        <Text style={tw`font-poppins-600 text-2xl mb-2`}>No groups yet?</Text>
        <View style={tw`w-full mt-4`}>
          <RoundButton
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            label={"Get started here!"}
            gradientColors={[tw.color("gray-300"), tw.color("gray-300/70")]}
            labelStyle={tw`capitalize`}
            textColor={tw.color("black")}
            showArrow={false}
          />
        </View>
      </CenteredColumn>
    </CenteredColumn>
  )
}

export default GroupPortfolios
