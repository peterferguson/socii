import LoadingIndicator from "@components/LoadingIndicator"
import { Popover, Transition } from "@headlessui/react"
import { tw } from "@utils/tw"
import React, { Fragment, useRef } from "react"
import { connectStateResults, Hits } from "react-instantsearch-dom"
import { useMediaQuery } from "react-responsive"
import { SearchHit } from "./SearchHit"

export const Loading = connectStateResults(({ isSearchStalled }) =>
  isSearchStalled ? <LoadingIndicator show={isSearchStalled} /> : null
)

// ! FIXME: If a user navigates to the same page they are on the loader appears indefinitely
export default function SearchResultsModal({ open }) {
  const is1Col = useMediaQuery({ minWidth: 640 })
  const hitsRef = useRef(null)

  // TODO: Implement nothing returned message
  return (
    <Transition
      show={open}
      as={"ul"}
      enter="transition ease-in duration-200"
      enterFrom="opacity-0"
      leave="transition ease-out duration-150"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Popover.Panel>
        {({ close }) => (
          <>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden" aria-hidden="true">
              &#8203;
            </span>
            <Loading className="p-4" />
            <Hits
              hitComponent={({ hit }) => <SearchHit hit={hit} close={close} />}
              ref={hitsRef}
            />
            {/* <PoweredBy /> */}
            {/* TODO: Create load more button */}
            <button className="hidden" ref={hitsRef} tabIndex={-1}>
              Load More
            </button>
          </>
        )}
      </Popover.Panel>
    </Transition>
  )
}
