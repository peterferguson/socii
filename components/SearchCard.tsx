import {
  InstantSearch,
  Hits,
  // SearchBox,
  Highlight,
  connectSearchBox,
  Configure,
  connectStateResults,
} from "react-instantsearch-dom";

import React, { Component } from "react";
import algoliasearch from "algoliasearch/lite";
import Modal from "react-bootstrap/Modal";
import CrossIcon from "@public/icons/cross.svg";
import Loader from "@components/Loader";

import Link from "next/link";

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

class SearchBox extends Component {
  timerId = null;

  state = {
    value: this.props.currentRefinement,
  };

  onChangeDebounced = (event) => {
    const { refine, delay } = this.props;
    const value = event.currentTarget.value;

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => refine(value), delay);

    this.setState(() => ({
      value: value.length ? value : null,
    }));
  };

  render() {
    const { value } = this.state;

    return (
      <input
        value={value}
        onChange={this.onChangeDebounced}
        placeholder='Search: "TSLA"'
      />
    );
  }
}

const DebouncedSearchBox = connectSearchBox(SearchBox);

const LoadingIndicator = connectStateResults(({ isSearchStalled }) => {
  return isSearchStalled ? <Loader show={isSearchStalled} /> : null;
});

const HitComponent = ({ hit }) => {
  if (hit) {
    return (
      <Link href={`stock/${hit.tickerSymbol}`}>
        <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
          <div className="flex-shrink-0">
            <img src={`${hit.image}`} alt="" className="h-12 w-12" />
          </div>
          <div className="ml-6 pt-1">
            <Highlight attribute="name" hit={hit} />
            <h4 className="text-xl text-gray-900">{hit.tickerSymbol}</h4>
            <p className="text-base text-gray-600">{hit.longName}</p>
          </div>
        </div>
      </Link>
    );
  }
};

export default function SearchCard(props) {
  return (
    <Modal
      show={props.showSearchCard}
      size="lg"
      onHide={props.toggleSearchCard}
      dialogClassName="w-11/12 h-11/12 flex p-24 m-8 bg-white rounded-lg shadow-xl"
    >
      <InstantSearch {...searchProps}>
        <Modal.Body>
          <div className="flex max-w-auto border-b">
            <Configure hitsPerPage={1} />
            <DebouncedSearchBox delay={400} className="p-2 flex-1 max-w-sm" />
            <button className="" onClick={props.toggleSearchCard}>
              <CrossIcon />
            </button>
          </div>
          <LoadingIndicator />
          <Hits
            hitComponent={HitComponent}
            className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl"
          />
        </Modal.Body>
      </InstantSearch>
    </Modal>
  );
}
