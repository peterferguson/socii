import tw from "app/lib/tailwind";
import { Setting } from "iconsax-react-native";
import React from "react";
import { Pressable } from "react-native";

export const Cog = ({ onPress, containerStyle = null, iconStyle = null }) => {
  return (
    <Pressable style={[tw`p-2`, containerStyle]} onPress={onPress}>
      <Setting style={iconStyle} size={24} variant="Outline" />
    </Pressable>
  );
};
