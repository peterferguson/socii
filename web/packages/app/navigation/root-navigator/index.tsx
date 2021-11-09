import { ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import OnboardingScreen from "app/screens/onboarding"
// import PinAuthenticationScreen from "app/screens/pin"
import { useState, useEffect } from "react"
import HeaderContainer from "app/components/Headers/HeaderContainer"
import { useStream } from "app/hooks"
import { headerScreenOptions } from "app/utils/headerScreenOptions"
import { BottomTabNavigator } from "app/navigation/bottom-tab-navigator"
import { NextNavigationProps } from "../types"
import { RootStack } from "./types"
import {
  getOnboardingComplete,
  onboardingCompletedListener,
} from "app/handlers/localstorage/onboarding"
import { DeviceEventEmitter } from "react-native"
import { useRouter } from "../use-router"

export const RootNavigator = (props: NextNavigationProps) => {
  const { clientReady } = useStream()
  const router = useRouter()
  const [onboardingCompleted, setOnboardingComplete] = useState(false)

  useEffect(() => {
    let timer

    const checkIfOnboardingComplete = async ([isCompleted]) => {
      setOnboardingComplete(isCompleted ?? false)
      timer = setTimeout(
        () => router.push(onboardingCompleted ? "/stocks" : "/onboarding"),
        500
      )
    }

    const onboardingListener = onboardingCompletedListener(checkIfOnboardingComplete)

    return () => {
      clearTimeout(timer)
      onboardingListener.remove()
    }
  }, [])

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
                  title: route.params.channelId,
                  headerTitle: () => (
                    <HeaderContainer
                      headerTitle={"Chat"}
                      text={route.params.channelId}
                    />
                  ),
                })}
              />
              <RootStack.Screen
                name="thread"
                component={ThreadScreen}
                options={{
                  title: "Chat Thread",
                  headerTitle: () => <HeaderContainer headerTitle={"Chat Thread"} />,
                }}
              />
            </RootStack.Group>
          )}
        </>
      )}
    </RootStack.Navigator>
  )
}
