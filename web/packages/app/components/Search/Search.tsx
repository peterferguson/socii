// import Highlight from "./Highlight"
import algoliasearch from "algoliasearch"
import Constants from "expo-constants"
import { Dimensions, Keyboard } from "react-native"
import React, { useEffect } from "react"
import { InstantSearch } from "react-instantsearch-native"
import { Modal, ModalBackdrop, ModalHeader } from ".."
import InfiniteHits from "./Hits"
import SearchInput from "./SearchInput"
import { useSearch } from "app/hooks/useSearch"
import { useRouter } from "app/navigation/use-router"

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

const searchTypeCollectionMapping = {
  tickers: "Stocks",
  users: "People",
  // events: "Events",
}

const Search = ({ searchCollection = "tickers" }) => {
  const { searchModalRef } = useSearch()
  const router = useRouter()
  const scrollPositions = ["20%", "80%"]
  const [insetHeight, setInsetHeight] = React.useState(WINDOW_HEIGHT * 0.15)

  useEffect(() => {
    const keyboardListener = Keyboard.addListener("keyboardDidShow", e =>
      setInsetHeight(e.endCoordinates.height)
    )

    return () => {
      setInsetHeight(WINDOW_HEIGHT * 0.15)
      keyboardListener.remove()
    }
  })

  // TODO: Animate the change in position of the loading indicator in line with the snap
  // TODO: position of the modal. Probably easiest to do this with moti
  return (
    <Modal
      modalRef={searchModalRef}
      snapToPositions={scrollPositions}
      detach={true}
      bottomInset={insetHeight}
      defaultPositionIndex={1}
      backdropComponent={ModalBackdrop}
      modalStyle={{ marginHorizontal: 24, paddingHorizontal: 12 }}
    >
      <InstantSearch searchClient={algoliaClient} indexName={searchCollection}>
        <ModalHeader
          modalRef={searchModalRef}
          label={`Search ${searchTypeCollectionMapping[searchCollection]}`}
        />
        <SearchInput />
        <SearchTypes />
        <InfiniteHits router={router}/>
      </InstantSearch>
    </Modal>
  )
}

const SearchTypes = () => <></>

export default Search
