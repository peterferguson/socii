import { Popover } from "@headlessui/react"
import { tw } from "@utils/tw"
import debounce from "lodash/debounce"
import React from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { connectSearchBox } from "react-instantsearch-dom"
import { useMediaQuery } from "react-responsive"

const Searchbar = connectSearchBox(({ refine, open }) => {
  const debouncedSearch = debounce((e) => refine(e.target.value), 200)
  const is1Col = useMediaQuery({ minWidth: 640 })
  const onChangeDebounced = (e) => {
    e.persist()
    debouncedSearch(e, e.eventTarget)
  }

  return (
    <div
      className={tw(
        "flex items-center justify-center z-40 bg-white rounded-full",
        "appearance-none focus:outline-none focus:ring-0 border",
        open ? "w-full h-full" : "w-8 h-8",
        "umami--click--nav-header-search-icon"
      )}
    >
      <Popover.Button
        aria-label={"Search Bar"}
        aria-haspopup="true"
        // as="div"
        className="group transition duration-500"
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
            "focus:outline-none focus:ring-0 dark:bg-gray-800"
          )}
        />
      )}
    </div>
  )
})

export default Searchbar
