import React from "react"
import { Platform } from "react-native"

import createStackNavigator from "app/navigation/create-stack-navigator"
import { GroupsScreen, NewGroupScreen, GroupScreen } from "app/screens/groups"
import { GroupsStackParams } from "app/navigation/types"
import tw from "../../lib/tailwind"
import HeaderContainer from "../../components/Headers/HeaderContainer"

const GroupsStack = createStackNavigator<GroupsStackParams>()

function GroupsNavigator() {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: tw.color("brand"),
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
          ...tw`bg-brand-gray dark:bg-brand-black opacity-100`,
        },
      }}
    >
      <GroupsStack.Group>
        <GroupsStack.Screen
          name="groupsScreen"
          component={GroupsScreen}
          options={{
            title: "Groups",
            headerTitle: () => <HeaderContainer headerTitle={"Groups"} />,
          }}
        />
        <GroupsStack.Screen
          name="groupScreen"
          component={GroupScreen}
          options={{
            title: "Group",
            headerTitle: () => <HeaderContainer headerTitle={"Group"} />,
          }}
        />
      </GroupsStack.Group>
      <GroupsStack.Group
        screenOptions={{
          headerShown: false,
          presentation: Platform.OS === "ios" ? "formSheet" : "transparentModal",
        }}
      >
        <GroupsStack.Screen name="new" component={NewGroupScreen} />
      </GroupsStack.Group>
    </GroupsStack.Navigator>
  )
}

export default GroupsNavigator
