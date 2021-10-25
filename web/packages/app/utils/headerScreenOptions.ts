import tw from "../lib/tailwind"

export const headerScreenOptions = {
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
} as any
