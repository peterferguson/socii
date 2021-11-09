import tw from "app/lib/tailwind";
import React from "react";
import AssetLogo from "./AssetLogo";
import { View } from "react-native";
import SkeletonCircle from "./SkeletonCircle";

export const AssetCardLogo = ({ isLoading, isin, symbol }) => (
  <View
    style={tw.style(`items-center justify-center rounded-full ml-1 mr-2`, {
      flex: 1,
    })}
  >
    {isLoading ? (
      <SkeletonCircle radius={24} />
    ) : (
      <AssetLogo isin={isin} asset={symbol} height="48" width="48" />
    )}
  </View>
);
