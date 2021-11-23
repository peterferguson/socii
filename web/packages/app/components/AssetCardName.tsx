import tw from "app/lib/tailwind";
import React from "react";
import { View, Text } from "react-native";

export const AssetCardName = ({
  isLoading, symbol, logoColor, shortName,
}: {
  isLoading: boolean;
  symbol: string;
  logoColor: string;
  shortName: string;
}) => (
  <View style={tw.style(`my-auto`, { flex: 4 })}>
    <View style={tw`flex-col my-auto`}>
      <Text
        style={tw.style(
          `text-sm tracking-wider text-gray-400 uppercase font-poppins-600`,
          {
            color: isLoading ? tw.color(`brand-black dark:brand-gray`) : logoColor,
          }
        )}
      >
        {isLoading ? "symbol" : symbol}
      </Text>
      <Text
        style={tw`flex text-xs tracking-wider text-gray-600 font-poppins-400`}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {isLoading ? "Company name" : shortName}
      </Text>
    </View>
  </View>
);
