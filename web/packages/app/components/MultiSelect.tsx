import React, { useState } from "react"
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
} from "react-native-dropdown-picker"
import { Platform } from "react-native"

DropDownPicker.setMode("BADGE")
Platform.OS == "android" ? DropDownPicker.setListMode("MODAL") : null
// DropDownPicker.setTheme("DARK")

// - copilot generated ... obviously not matching any design system
const BADGE_DOT_COLORS = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
]
// - added 73 to the end for 45% opacity
const BADGE_COLORS = [
  "#F4433673",
  "#E91E6373",
  "#9C27B073",
  "#673AB773",
  "#3F51B573",
  "#2196F373",
  "#03A9F473",
  "#00BCD473",
  "#00968873",
  "#4CAF5073",
  "#8BC34A73",
  "#CDDC3973",
  "#FFEB3B73",
  "#FFC10773",
  "#FF980073",
  "#FF572273",
  "#79554873",
  "#9E9E9E73",
  "#607D8B73",
]

interface MultiSelectProps
  extends Omit<
    DropDownPickerProps,
    "value" | "setValue" | "setItems" | "open" | "setOpen"
  > {
  selectedItems: ValueType | ValueType[] | null
  setSelectedItems: React.Dispatch<React.SetStateAction<ValueType | ValueType[] | null>>
}

const DEFAULT_PROPS = {
  searchPlaceholder: "Search",
  searchable: true,
  itemSeparator: true,
  itemSeparatorStyle: { backgroundColor: "#e0e0e0" },
  multiple: true,
  min: 0,
  showBadgeDot: true,
}

const Multiselect: React.FC<MultiSelectProps> = ({
  items,
  selectedItems,
  setSelectedItems,
  ...props
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownItems, setDropdownItems] = useState(items)

  return (
    <DropDownPicker
      open={dropdownOpen}
      value={selectedItems}
      items={dropdownItems}
      setOpen={setDropdownOpen}
      setValue={setSelectedItems}
      setItems={setDropdownItems}
      badgeColors={BADGE_COLORS}
      badgeDotColors={BADGE_DOT_COLORS}
      {...DEFAULT_PROPS}
      {...props}
    />
  )
}

export default Multiselect
