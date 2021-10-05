// TODO
// Check if working in other pages!!!!
// correct route to be general
import { Tab } from "@headlessui/react"
import { tw } from "@utils/tw"
import { useRouter } from "next/router"
import React from "react"

interface TabHeadingProps {
  categories: { [key: string]: any[] }
  className?: string
}

export const TabHeading = ({ categories }: TabHeadingProps) => {
  const router = useRouter()
  return (
    <Tab.List className="flex p-1 space-x-1 bg-gray-300/20 rounded-2xl">
      {Object.keys(categories).map((category) => (
        <Tab
          key={category}
          className={({ selected }) =>
            tw(
              "w-full py-2.5 px-1 text-sm leading-5 font-medium text-brand rounded-xl",
              "focus:outline-none",
              `umami--click--${router.asPath
                .slice(1)
                .replace(/\//g, "-")}-route-tab-heading-${category
                .replace(/\s/g, "")
                .toLowerCase()}`,
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
}
