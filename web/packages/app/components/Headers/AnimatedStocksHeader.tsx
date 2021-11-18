import { AnimatedNavBar } from "./AnimatedNavBar"
import { CenteredColumn, CenteredRow } from "app/components/Centered"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import tw from "app/lib/tailwind"
import React from "react"
import { SearchIcon } from "../Search/SearchIcon"

export const AnimatedStocksHeader = ({ scrollY }) => (
  <CenteredColumn>
    <AnimatedNavBar
      scrollY={scrollY}
      PreAnimationComponent={() => (
        <HeaderTitle headerTitle="Stonks" textStyle={tw`text-base text-center`} />
      )}
      PostAnimationComponent={() => (
        <CenteredRow style={tw`mx-2`}>
          <CenteredRow style={tw`justify-between`}>
            <HeaderTitle
              containerStyle={tw`flex-7 items-start`}
              headerTitle="Trending Stonks"
              textStyle={tw`text-base text-center`}
            />
            <SearchIcon containerStyle={tw`flex-1`} />
          </CenteredRow>
        </CenteredRow>
      )}
    />
  </CenteredColumn>
)
