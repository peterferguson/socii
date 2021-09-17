import { SlashSearchKey } from "@components/SearchKey"
import { Popover } from "@headlessui/react"
import debounce from "lodash/debounce"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { connectSearchBox } from "react-instantsearch-dom"

const SearchResultsModal = dynamic(() => import("@components/SearchResultsModal"), {
  ssr: true,
})

const Searchbar = connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce((e) => refine(e.target.value), 200)

  const onChangeDebounced = (e) => {
    e.persist()
    debouncedSearch(e, e.eventTarget)
  }

  const [showSearchCard, setShowSearchCard] = useState(false)

  return (
    <Popover className="container relative left-0 z-50 flex flex-grow w-full h-full">
      <Popover.Button
        aria-label={"Search Bar"}
        aria-haspopup="true"
        as="div"
        className="flex items-center w-full h-full bg-white rounded-full appearance-none group"
        onClick={() => setShowSearchCard(true)}
      >
        <HiOutlineSearch className="w-5 h-5 mx-2 text-gray-400" />
        <input
          onChange={onChangeDebounced}
          placeholder="Search: TSLA"
          type="search"
          className="block w-full px-1 leading-normal text-gray-400 border-none rounded-full placeholder-current py-1.5 focus:border-transparent focus:outline-none focus:ring-0 ring-opacity-90 dark:bg-gray-800"
        />
      </Popover.Button>
      <SearchResultsModal
        showSearchCard={showSearchCard}
        setShowSearchCard={setShowSearchCard}
      />
    </Popover>
  )
})

export default Searchbar
