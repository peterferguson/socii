import HeaderTitle from "app/components/Headers/HeaderTitle"
import HeaderWithPhoto from "app/components/Headers/HeaderWithPhoto"
import tw from "app/lib/tailwind"
import createStackNavigator from "app/navigation/create-stack-navigator"
import { GroupsStackParams } from "app/navigation/types"
import { GroupScreen, GroupsScreen, NewGroupScreen } from "app/screens/groups"
import React from "react"
import { Platform } from "react-native"

const GroupsStack = createStackNavigator<GroupsStackParams>()

function GroupsNavigator() {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: tw.color("brand-black"),
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
            headerTitle: () => <HeaderWithPhoto title={"Groups"} />,
          }}
        />
        <GroupsStack.Screen
          name="groupScreen"
          component={GroupScreen}
          options={({ route }) => ({
            headerTitle: () => <HeaderTitle headerTitle={route.params.id} />,
          })}
        />
      </GroupsStack.Group>
      <GroupsStack.Group
        screenOptions={{
          headerShown: true,
          // - This gives a nice effect where the modal presentation also shrinks the previous screen
          // headerShown: false,
          // presentation: Platform.OS === "ios" ? "formSheet" : "transparentModal",
        }}
      >
        <GroupsStack.Screen
          name="new"
          component={NewGroupScreen}
          options={({ route }) => ({
            headerTitle: () => <HeaderTitle headerTitle={"Create a group"} />,
          })}
        />
      </GroupsStack.Group>
    </GroupsStack.Navigator>
  )
}

export default GroupsNavigator
