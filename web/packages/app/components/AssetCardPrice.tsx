import { pnlBackgroundColor } from "../utils/pnlBackgroundColor";
import tw from "app/lib/tailwind";
import React from "react";
import { View, Text } from "react-native";
import { PriceWithChangeTagSkeleton } from "./PriceWithChangeTag";

export const AssetCardPrice = ({ isLoading, price, percentChange }) => {
  const pnlColor = pnlBackgroundColor(price?.changePercent);
  const pnlTextColor = pnlColor.replace("200", "600").replace("bg", "text");
  return (
    <View
      style={tw.style(`flex flex-col items-center justify-center ml-4`, { flex: 2 })}
    >
      {isLoading ? (
        <PriceWithChangeTagSkeleton />
      ) : (
        <>
          <Text
            style={tw`overflow-hidden text-sm tracking-wider font-open-sans-600 text-gray-600 uppercase `}
          >
            ${price?.toFixed(2)}
          </Text>
          <View style={tw`${pnlColor} px-2 py-0.5 rounded-full w-full`}>
            <Text
              style={tw`text-black text-tiny sm:text-xs font-open-sans-600 text-center ${pnlTextColor}`}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              M: {(percentChange * 100)?.toFixed(2)}%
            </Text>
          </View>
        </>
      )}
    </View>
  );
};
