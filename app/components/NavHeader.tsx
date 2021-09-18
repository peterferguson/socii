import HeaderDropdownButton from "@components/HeaderDropdownButton"
import Searchbar from "@components/Searchbar"
import UserPhoto from "@components/UserPhoto"
import { useAuth } from "@hooks/useAuth"
import algoliasearch from "algoliasearch/lite"
import { NextRouter, useRouter } from "next/router"
import React, { Fragment, useMemo } from "react"
import { HiOutlineCog } from "react-icons/hi"
import { VscSignOut } from "react-icons/vsc"
import { Configure, InstantSearch } from "react-instantsearch-dom"
import { UrlObject } from "url"
import { Popover } from "@headlessui/react"

import dynamic from "next/dynamic"
const SearchResultsModal = dynamic(() => import("@components/SearchResultsModal"), {
  ssr: true,
})

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
)

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      })
    }

    return algoliaClient.search(requests)
  },
}

const searchProps = {
  indexName: "tickers",
  searchClient,
  searchFunction: (helper) => {
    // - No search of less than 2 characters
    if (helper.state.query.length < 2) return
    helper.search()
  },
}

const dropdownItems = (
  router: NextRouter,
  signout: (redirect: string | UrlObject, showToast: boolean) => void
) => [
  {
    name: "Settings",
    onClick: () => router.push("/settings"),
    notificationCount: 0,
    leftIcon: () => <HiOutlineCog className="w-6 h-6" />,
  },
  {
    name: "Log Out",
    onClick: () => signout("/", true),
    notificationCount: 0,
    leftIcon: () => <VscSignOut className="w-6 h-6" />,
  },
]

const pathTitles = {
  "/settings": "Settings",
  "/groups": "Groups",
  "/crypto": "Crypto",
  "/stocks": "Stocks",
  "/chat": "Chat",
  "/portfolio": "Portfolio",
}

const routeTitle = (path: string) =>
  pathTitles[
    Object.keys(pathTitles)
      .filter((k) => path?.includes(k))
      .pop()
  ]

const NavHeader: React.FC = () => {
  const { signout } = useAuth()
  const router = useRouter()
  const items = useMemo(() => dropdownItems(router, signout), [router, signout])

  const title = routeTitle(router.asPath)

  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <InstantSearch {...searchProps}>
          <Configure hitsPerPage={3} />
          <header className="fixed inset-y-0 left-0 z-10 items-center w-full pt-4 h-11 sm:h-16 sm:left-[12.5%] sm:w-[87.5%]">
            <div className="flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="flex items-center justify-between flex-grow w-full pl-1 border-b bg-gray-50 dark:bg-gray-700 lg:max-w-68 sm:pr-2 sm:ml-0">
                <div className="px-2 text-2xl font-light align-bottom sm:text-3xl font-primary">
                  {title}
                </div>
                <div className="flex-grow hidden md:block" />
                <div className="flex items-center justify-end w-11/12 md:w-1/2 space-x-0 sm:space-x-2">
                  <Searchbar open={open} />
                  <HeaderDropdownButton
                    name="Settings Dropdown"
                    icon={() => <UserPhoto />}
                    items={items}
                  />
                </div>
              </div>
            </div>
            <SearchResultsModal open={open} />
          </header>
        </InstantSearch>
      )}
    </Popover>
  )
}

export default React.memo(NavHeader)
