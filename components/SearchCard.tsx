import {
  InstantSearch,
  Hits,
  Highlight,
  connectSearchBox,
  Configure,
  connectStateResults,
} from "react-instantsearch-dom";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import SearchIcon from "@icons/search.svg";
import Loader from "@components/Loader";
import Link from "next/link";
import debounce from "lodash/debounce";
import { Dialog } from "@headlessui/react";

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_ID,
  process.env.ALGOLIA_SEARCH_KEY
);

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
      });
    }

    return algoliaClient.search(requests);
  },
};

const searchProps = {
  indexName: "tickers",
  searchClient,
  searchFunction: function (helper) {
    if (helper.state.query.length < 2) {
      return; // no search if less than 2 character
    }
    helper.search();
  },
};

const DebouncedSearchBox = connectSearchBox(({ refine }) => {
  const debouncedSearch = debounce((e) => refine(e.target.value), 200);

  const onChangeDebounced = (e) => {
    e.persist();
    debouncedSearch(e, e.eventTarget);
  };

  return (
    <div className="w-full p-2 m-8 ">
      <input
        onChange={onChangeDebounced}
        placeholder="Search: TSLA"
        type="search"
        className="rounded-full w-full text-center p-2 focus:outline-none"
      />
      <SearchIcon className="-my-8 mx-4 text-gray-400" />
    </div>
  );
});

const LoadingIndicator = connectStateResults(({ isSearchStalled }) => {
  return isSearchStalled ? <Loader show={isSearchStalled} /> : null;
});

const Hit = ({ hit }) => (
  <Link href={`/stock/${hit.tickerSymbol}`}>
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10 w-full">
      <img
        src={`https://storage.googleapis.com/sociiinvest.appspot.com/logos/${hit.ISIN}.png`}
        alt=""
        className="h-12 w-12 rounded-full border-brand border-double -mx-14 -my-8"
      />
      <Highlight attribute="name" hit={hit} />
      <div className="flex pt-4">
        <h4 className="text-xl flex-1 text-gray-900">{hit.tickerSymbol}</h4>
        <p className="text-base inline text-right text-green-400">$ Price</p>
      </div>
      <div className="flex">
        <p className="text-base flex-1 text-gray-600">{hit.longName}</p>
        <p className="inline text-base text-right text-red-400">Change%</p>
      </div>
    </div>
  </Link>
);
export default function SearchCard({ showSearchCard, setShowSearchCard }) {
  const isOpen = showSearchCard;
  const setIsOpen = setShowSearchCard;

  // TODO Fix the dialog styling for mobile
  // TODO Need to fix display coloring
  // TODO Need to close on redirect
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={`fixed inset-1 overflow-y-auto w-11/12 p-24 m-8 bg-gray-200 \
                  rounded-lg shadow-xl backdrop-filter backdrop-blur-lg \
                  bg-opacity-50 bg-clip-padding z-50`}
    >
      <InstantSearch {...searchProps}>
        <Configure hitsPerPage={1} />
        <DebouncedSearchBox delay={400} className="p-2 flex-1 max-w-sm" />
        {/* <LoadingIndicator className="p-4" /> */}
        <Hits
          hitComponent={Hit}
          className="py-4 px-8 rounded-lg my-10 w-full"
        />
        {/* <PoweredBy /> */}
      </InstantSearch>
    </Dialog>
  );
}
