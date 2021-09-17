import { Popover } from "@headlessui/react"
import { tw } from "@utils/tw"
import debounce from "lodash/debounce"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { connectSearchBox } from "react-instantsearch-dom"
import { useMediaQuery } from "react-responsive"

const SearchResultsModal = dynamic(() => import("@components/SearchResultsModal"), {
  ssr: true,
})

const Searchbar = connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce((e) => refine(e.target.value), 200)
  const [showSearchCard, setShowSearchCard] = useState(false)

  const is1Col = useMediaQuery({ minWidth: 640 })

  const toggleSearchCard = () => setShowSearchCard(!showSearchCard)

  const onChangeDebounced = (e) => {
    e.persist()
    debouncedSearch(e, e.eventTarget)
  }

  return (
    <Popover className="relative z-50 flex items-center justify-end w-full h-full">
      {({ open }) => (
        <>
          <div
            className={tw(
              "flex items-center justify-center bg-white rounded-full",
              "appearance-none",
              open ? "w-full h-full" : "w-8 h-8"
            )}
          >
            <Popover.Button
              aria-label={"Search Bar"}
              aria-haspopup="true"
              // as="div"
              className="group transition duration-500"
              onClick={toggleSearchCard}
            >
              <HiOutlineSearch className="w-5 h-5 mx-2 text-gray-400" />
            </Popover.Button>
            {open && (
              <input
                onChange={onChangeDebounced}
                placeholder={is1Col ? "Search" : "Search: TSLA"}
                type="search"
                ref={focus}
                autoFocus={true}
                className={tw(
                  "leading-normal text-gray-400 transition duration-300 border-none rounded-full",
                  "h-full w-full placeholder-current -ml-2 py-1.5 focus:border-transparent",
                  "focus:outline-none focus:ring-0 ring-opacity-90 dark:bg-gray-800"
                )}
              />
            )}
          </div>
          <SearchResultsModal
            showSearchCard={showSearchCard}
            setShowSearchCard={setShowSearchCard}
          />
        </>
      )}
    </Popover>
  )
})

export default Searchbar
