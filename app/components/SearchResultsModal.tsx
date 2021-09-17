import LoadingIndicator from "@components/LoadingIndicator"
import { Popover, Transition } from "@headlessui/react"
import { tw } from "@utils/tw"
import { useRouter } from "next/router"
import React, { useEffect, useRef } from "react"
import { connectStateResults, Hits } from "react-instantsearch-dom"
import { SearchHit } from "./SearchHit"
import { useMediaQuery } from "react-responsive"

export const Loading = connectStateResults(({ isSearchStalled }) =>
  isSearchStalled ? <LoadingIndicator show={isSearchStalled} /> : null
)

// ! FIXME: If a user navigates to the same page they are on the loader appears indefinitely
export default function SearchResultsModal({ showSearchCard, setShowSearchCard }) {
  const router = useRouter()
  const is1Col = useMediaQuery({ minWidth: 640 })

  const hitsRef = useRef(null)
  const toggleSearchCard = () => setShowSearchCard(!showSearchCard)

  useEffect(() => {
    if (showSearchCard) toggleSearchCard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  // TODO: Implement nothing returned message
  return (
    <Transition
      as={"ul"}
      enter="transition ease-in duration-200"
      enterFrom="opacity-0"
      leave="transition ease-out duration-150"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Popover.Panel static className={tw(is1Col && "w-full")}>
        {({ close }) => (
          <>
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
