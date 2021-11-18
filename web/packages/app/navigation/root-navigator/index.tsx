import HeaderTitle from "app/components/Headers/HeaderTitle"
import { useStream } from "app/hooks"
import { useAppContext } from "app/hooks/useAppContext"
import { BottomTabNavigator } from "app/navigation/bottom-tab-navigator"
import { ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import OnboardingScreen from "app/screens/onboarding"
import { headerScreenOptions } from "app/utils/headerScreenOptions"
import { NextNavigationProps } from "../types"
import { RootStack } from "./types"

export const RootNavigator = (props: NextNavigationProps) => {
  const { clientReady } = useStream()
  const { onboardingCompleted } = useAppContext()

  return (
    <RootStack.Navigator
      initialRouteName={onboardingCompleted ? "withBottomBar" : "onboarding"}
      screenOptions={{ headerShown: false, ...headerScreenOptions }}
    >
      {!onboardingCompleted ? (
        <RootStack.Screen
          name="onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <RootStack.Screen
            name="withBottomBar"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          {clientReady && ( // TODO: Add screen for logging in users in chat navigator
            <RootStack.Group>
              <RootStack.Screen
                name="channel"
                component={ChannelScreen}
                options={({ route }) => ({
                  headerTitle: () => (
                    <HeaderTitle
                      headerTitle={
                        route.params.channelId ? route.params.channelId : "Chat"
                      }
                    />
                  ),
                })}
              />
              <RootStack.Screen
                name="thread"
                component={ThreadScreen}
                options={{
                  title: "Chat Thread",
                  headerTitle: () => <HeaderTitle headerTitle={"Chat Thread"} />,
                }}
              />
            </RootStack.Group>
          )}
        </>
      )}
    </RootStack.Navigator>
  )
}
