import { Tab } from "@headlessui/react"
import React from "react"
import { tw } from "@utils/tw"

interface TabHeadingProps {
  categories: { [key: string]: any[] }
  className?: string
}

export const TabHeading = ({ categories, className }: TabHeadingProps) => (
  <Tab.List className={tw("flex p-1 space-x-1 bg-gray-300/20 rounded-2xl", className)}>
    {Object.keys(categories).map((category) => (
      <Tab
        key={category}
        className={({ selected }) =>
          tw(
            "w-full py-2.5 px-1 text-sm leading-5 font-medium text-brand rounded-xl",
            "focus:outline-none",
            selected
              ? "bg-white shadow"
              : "hover:text-brand/80 hover:bg-white/20 text-logo-darkBg/50"
          )
        }
      >
        {category}
      </Tab>
    ))}
  </Tab.List>
)
