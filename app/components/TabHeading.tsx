// TODO 
// Check if working in other pages!!!!
// correct route to be general
import { Tab } from "@headlessui/react";
import React from "react";
import { tw } from "@utils/tw";
import Link from "next/link"
import { useRouter } from "next/router"

interface TabHeadingProps {
  categories: { [key: string]: any[] }
  className?: string
}

export const TabHeading = ({ categories, className }: TabHeadingProps) => {
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
          <Link href={`${useRouter().route}?${category}`} as={`${useRouter().route}/tabs/${category.replace(" ","")}`}>
          {category}
          </Link>
        </Tab>
      ))}
    </Tab.List>
  )
}
