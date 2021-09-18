import { HeaderDropdownButton, Searchbar, UserPhoto } from "@components"
import { useAuth } from "@hooks/useAuth"
import algoliasearch from "algoliasearch/lite"
import { NextRouter, useRouter } from "next/router"
import React, { useMemo } from "react"
import { HiOutlineCog } from "react-icons/hi"
import { VscSignOut } from "react-icons/vsc"
import { Configure, InstantSearch } from "react-instantsearch-dom"
import { UrlObject } from "url"

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
    <InstantSearch {...searchProps}>
      <Configure hitsPerPage={3} />
      <header className="sticky z-40 items-center h-16 mt-2 ml-8 mr-4 border-b w-[calc(100%-56px)] dark:bg-gray-700">
        <div className="z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
          <div className="flex items-center justify-between flex-grow w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
            <div className="pr-2 text-2xl font-light align-bottom sm:text-3xl font-primary">{title}</div>
            <div className="flex-grow hidden md:block" />
            <div className="flex items-center justify-end w-11/12 md:w-1/2 space-x-0 sm:space-x-2">
              <Searchbar />
              {/* <HeaderButton
                name="Messages"
                icon={() => <HiOutlineMail className="w-6 h-6" />}
                onClick={() => router.push("/chat")}
                hasNotifications={true}
              /> */}
              <HeaderDropdownButton
                name="Settings Dropdown"
                // icon={() => <HiOutlineChevronDown className="w-6 h-6" />}
                icon={() => <UserPhoto />}
                items={items}
              />
            </div>
          </div>
        </div>
      </header>
    </InstantSearch>
  )
}

export default React.memo(NavHeader)
