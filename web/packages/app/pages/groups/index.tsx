import React from "react"
import { Platform } from "react-native"

import createStackNavigator from "app/navigation/create-stack-navigator"
import GroupsScreen from "app/screens/groups"
import GroupScreen from "app/screens/group"
import NewGroupScreen from "app/screens/new-group"
import { GroupsStackParams } from "app/navigation/types"

const GroupsStack = createStackNavigator<GroupsStackParams>()

function GroupsNavigator() {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
        },
      }}
    >
      <GroupsStack.Group>
        <GroupsStack.Screen
          name="groups"
          component={GroupsScreen}
          options={{ title: "Groups", headerTitle: "Groups" }}
        />
        <GroupsStack.Screen
          name="group"
          component={GroupScreen}
          options={{ title: "Group", headerTitle: "Group" }}
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
