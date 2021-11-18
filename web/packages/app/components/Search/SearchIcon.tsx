import { useSearchModal } from "app/hooks/useSearchModal"
import tw from "app/lib/tailwind"
import { SearchNormal1 } from "iconsax-react-native"
import React from "react"
import { Pressable, ViewProps } from "react-native"

interface SearchIconProps {
  overrideOnPress?: () => void
  containerStyle?: ViewProps
  iconVariant?: "Bulk" | "Linear" | "Outline" | "Broken" | "Bold" | "TwoTone"
  iconSize?: string
  iconColor?: string
}

export const SearchIcon: React.FC<SearchIconProps> = ({
  containerStyle = tw`pr-4 pt-4`,
  iconSize = "24",
  iconVariant = "Bulk",
  iconColor = tw`text-brand-black dark:text-brand-gray`.color as string,
  overrideOnPress = undefined,
}) => {
  const { handlePresent } = useSearchModal()
  return (
    <Pressable
      style={containerStyle}
      onPress={() => (overrideOnPress ? overrideOnPress() : handlePresent())}
    >
      <SearchNormal1 size={iconSize} variant={iconVariant} color={iconColor} />
    </Pressable>
  )
}
