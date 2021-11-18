import { AnimatedNavBar } from "./AnimatedNavBar"
import { CenteredColumn, CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import tw from "app/lib/tailwind"
import React from "react"
import { SearchIcon } from "../Search/SearchIcon"
import { UserPhoto } from "app/components/UserPhoto"

export const AnimatedStocksHeader = ({ scrollY }) => (
  <CenteredColumn>
    <AnimatedNavBar
      scrollY={scrollY}
      PreAnimationComponent={() => (
        <CenteredRow style={tw`mx-2 w-full justify-between`}>
          <HeaderTitle headerTitle="Stonks" textStyle={tw`text-base text-center`} />
          <UserPhoto containerStyle={tw`mr-4`} />
        </CenteredRow>
      )}
      PostAnimationComponent={() => (
        <CenteredRow style={tw`mx-2`}>
          <CenteredRow style={tw`justify-between`}>
            <HeaderTitle
              containerStyle={tw`flex-${UserPhoto ? 6 : 7} items-start`}
              headerTitle="Trending Stonks"
              textStyle={tw`text-base text-center`}
            />
            <SearchIcon containerStyle={tw`flex-1`} />
            <UserPhoto containerStyle={tw`flex-1`} />
          </CenteredRow>
        </CenteredRow>
      )}
    />
  </CenteredColumn>
)
