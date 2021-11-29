import { CenteredColumn, CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import tw from "app/lib/tailwind"
import { Dimensions } from "react-native"
import React from "react"
import { SearchIcon } from "../Search/SearchIcon"
import { AnimatedNavBar } from "./AnimatedNavBar"
import HeaderWithPhoto from "./HeaderWithPhoto"
import { useNavigation, DrawerActions } from "@react-navigation/native"
import { UserPhoto } from "../UserPhoto"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const AnimatedStocksHeader = ({ scrollY }) => {
  const navigation = useNavigation()
  return (
    <CenteredColumn>
      <AnimatedNavBar
        scrollY={scrollY}
        PreAnimationComponent={() => (
          <CenteredRow
            style={tw.style(`mx-2 justify-between`, { width: SCREEN_WIDTH })}
          >
            <HeaderWithPhoto title="Stocks" />
          </CenteredRow>
        )}
        PostAnimationComponent={() => (
          <CenteredRow
            style={tw.style(`mx-2 justify-between`, { width: SCREEN_WIDTH })}
          >
            <UserPhoto
              overrideOnPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />

            <HeaderTitle
              title="Trending Stocks"
              textStyle={tw`text-base text-center`}
            />
            <SearchIcon containerStyle={tw`mr-4 p-2`} />
          </CenteredRow>
        )}
      />
    </CenteredColumn>
  )
}
