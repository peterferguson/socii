// import Highlight from "./Highlight"
import algoliasearch from "algoliasearch"
import Constants from "expo-constants"
import { Dimensions } from "react-native"
import React from "react"
import { InstantSearch } from "react-instantsearch-native"
import { Modal, ModalBackdrop, ModalHeader } from ".."
import InfiniteHits from "./Hits"

const { algoliaId, algoliaSearchKey } = Constants.manifest.extra.algolia
const algoliaClient = algoliasearch(algoliaId, algoliaSearchKey)

// const searchClient = {
//   search(requests) {
//     if (requests.every(({ params }) => !params.query)) {
//       return Promise.resolve({
//         results: requests.map(() => ({
//           hits: [],
//           nbHits: 0,
//           nbPages: 0,
//           page: 0,
//           processingTimeMS: 0,
//         })),
//       })
//     }

//     return algoliaClient.search(requests)
//   },
// }

// const searchProps = {
//   indexName: "tickers",
//   searchClient,
//   searchFunction: helper => {
//     // - No search of less than 2 characters
//     if (helper.state.query.length < 2) return
//     helper.search()
//   },
// }

const { height: WINDOW_HEIGHT } = Dimensions.get("window")

const Search = ({ modalRef, searchCollection = "tickers" }) => {
  const scrollPositions = ["20%", "80%"]

  // TODO: Animate the change in position of the loading indicator in line with the snap
  // TODO: position of the modal. Probably easiest to do this with moti
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      detach={true}
      bottomInset={WINDOW_HEIGHT * 0.15}
      defaultPositionIndex={0}
      backdropComponent={ModalBackdrop}
      modalStyle={{
        marginHorizontal: 24,
        paddingHorizontal: 12,
      }}
    >
      <InstantSearch searchClient={algoliaClient} indexName={searchCollection}>
        <ModalHeader modalRef={modalRef} label={"Search box Placeholder"} />
        <InfiniteHits />
      </InstantSearch>
    </Modal>
  )
}

export default Search
