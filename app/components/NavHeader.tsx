import {
  HeaderButton,
  HeaderDropdownButton,
  ProfilePhoto,
  Searchbar,
} from "@components"
import { useAuth } from "@hooks/useAuth"
import algoliasearch from "algoliasearch/lite"
import React from "react"
import { HiOutlineChevronDown, HiOutlineMail } from "react-icons/hi"
import { VscSignOut } from "react-icons/vsc"
import { Configure, InstantSearch } from "react-instantsearch-dom"
import { useMediaQuery } from "react-responsive"
import Socii from "./SociiIMG"

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

interface INavHeader {
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
}

const NavHeader: React.FC<INavHeader> = ({ showChat, setShowChat }) => {
  const { signout } = useAuth()
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const dropdownItems = [
    {
      name: "Log Out",
      onClick: () => signout(),
      notificationCount: 0,
      leftIcon: () => <VscSignOut className="w-6 h-6" />,
    },
  ]
  return (
    <InstantSearch {...searchProps}>
      <Configure hitsPerPage={3} />
      <header className="sticky z-40 items-center w-full h-16 bg-white shadow-md top-2 left-8 dark:bg-gray-700 rounded-2xl">
        <div className="z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
          <div className="flex items-center justify-between flex-grow w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
            {/* {is1Col && <Socii height="56" width="56" />} */}
            <Searchbar />
            <div className="flex-grow" />
            <div className="flex justify-end w-1/4 space-x-1 sm:space-x-2">
              {/* {!is1Col && <ProfilePhoto />} */}
              <HeaderButton
                name="Messages"
                icon={() => <HiOutlineMail className="w-6 h-6" />}
                onClick={() => setShowChat(!showChat)}
                hasNotifications={true}
              />
              <HeaderDropdownButton
                name="Settings Dropdown"
                icon={() => <HiOutlineChevronDown className="w-6 h-6" />}
                items={dropdownItems}
              />
            </div>
          </div>
        </div>
      </header>
    </InstantSearch>
  )
}

export default NavHeader
