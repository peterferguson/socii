import React from 'react';

import createStackNavigator from 'app/navigation/create-stack-navigator';
import HomeScreen from 'app/screens/home';
import { HomeStackParams } from 'app/navigation/types';

const HomeStack = createStackNavigator<HomeStackParams>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0
        }
      }}
    >
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: 'Home', headerTitle: 'These are page titles' }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
