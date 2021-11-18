import { SearchNormal1 } from "iconsax-react-native"
import { Pressable, ViewProps } from "react-native"
import tw from "app/lib/tailwind"
import React from "react"
import { useSearchModal } from "app/hooks/useSearchModal"

interface SearchIconProps {
  overrideOnPress?: () => void
  iconVariant?: "Bulk" | "Linear" | "Outline" | "Broken" | "Bold" | "TwoTone"
  iconSize?: string
  iconColor?: string
  containerStyle?: ViewProps
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
