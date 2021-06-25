import LoadingIndicator from "@components/LoadingIndicator"
import { Dialog } from "@headlessui/react"
import { FaSearch } from "react-icons/fa"
import algoliasearch from "algoliasearch/lite"
import debounce from "lodash/debounce"

import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useAsync } from "react-async-hook"
import {
  Configure,
  connectSearchBox,
  connectStateResults,
  Highlight,
  Hits,
  InstantSearch,
} from "react-instantsearch-dom"
import { iexQuote } from "utils/helper"

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
  searchFunction: function (helper) {
    // - No search of less than 2 characters
    if (helper.state.query.length < 2) return
    helper.search()
  },
}

const DebouncedSearchBox = connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce((e) => refine(e.target.value), 200)

  const onChangeDebounced = (e) => {
    e.persist()
    debouncedSearch(e, e.eventTarget)
  }

  return (
    <div className="w-full p-2 mx-auto">
      <input
        onChange={onChangeDebounced}
        placeholder="Search: TSLA"
        type="search"
        className="w-full p-2 text-center rounded-full focus:outline-none focus:border-brand-light focus:ring-brand-light"
      />
      <FaSearch className="mx-4 -my-8 text-gray-400" />
    </div>
  )
})

const Loading = connectStateResults(({ isSearchStalled }) => {
  return isSearchStalled ? <LoadingIndicator show={isSearchStalled} /> : null
})

const Hit = ({ hit }) => {
  const [loadingTicker, setLoadingTicker] = useState(false)

  const price = useAsync(
    () => iexQuote(hit.tickerSymbol, "latestPrice,changePercent"),
    []
  )

  const hitClickHandler = () => setLoadingTicker(!loadingTicker)

  return (
    <Link href={`/stocks/${hit.tickerSymbol}`}>
      <div
        className="w-full max-w-md px-8 py-4 my-2 bg-white rounded-lg shadow-lg sm:my-0"
        onClick={hitClickHandler}
      >
        <img
          src={`https://storage.googleapis.com/sociiinvest.appspot.com/logos/${hit.ISIN}.png`}
          alt=""
          className="w-12 h-12 -my-8 border-double rounded-full border-brand -mx-14"
        />
        <Highlight attribute="name" hit={hit} />
        {loadingTicker && <Loading show={loadingTicker} className="z-50" />}
        <div className="flex pt-4">
          <div className="flex-1 text-xl text-gray-900">{hit.tickerSymbol}</div>
          {price.result ? (
            <p className="inline text-base text-right text-green-400">
              $ {price.result?.latestPrice}
            </p>
          ) : (
            <div className="w-16 h-6 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />
          )}
        </div>
        <div className="flex">
          <p className="flex-1 text-base text-gray-600">{hit.longName}</p>
          {price.result ? (
            <p className={"inline text-base text-right text-red-400"}>
              {(100 * price.result?.changePercent).toFixed(2)}%
            </p>
          ) : (
            <div className="w-16 h-6 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />
          )}
        </div>
      </div>
    </Link>
  )
}

// ! BUG: If a user navigates to the same page they are on the loader appears indefinitely
export default function SearchCard({
  showSearchCard: isOpen,
  setShowSearchCard: setIsOpen,
}) {
  const router = useRouter()

  useEffect(() => {
    if (isOpen) setIsOpen(!isOpen)
  }, [router.asPath])

  // TODO Fix the dialog styling for mobile
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={`fixed inset-0 overflow-y-auto h-2/3 w-11/12 p-8 sm:p-24 my-auto sm:my-8 mx-auto bg-gray-200 \
                  rounded-lg shadow-xl backdrop-filter backdrop-blur-lg \
                  bg-opacity-50 bg-clip-padding z-50`}
    >
      <InstantSearch {...searchProps}>
        <Configure hitsPerPage={3} />
        <DebouncedSearchBox delay={400} className="flex-1 max-w-sm p-2" />
        <Loading className="p-4" />
        <Hits hitComponent={Hit} className="w-full my-16 rounded-lg sm:my-24" />
        {/* <PoweredBy /> */}
      </InstantSearch>
    </Dialog>
  )
}
