import React from "react"
import { connectHighlight } from "react-instantsearch-native"
import AssetHit from "./AssetHit"

const Highlight = ({ attribute, hit }) => {
  return (
    <AssetHit isin={hit?.ISIN} symbol={hit?.tickerSymbol} shortName={hit?.shortName} />
  )
}
export default connectHighlight(Highlight)
