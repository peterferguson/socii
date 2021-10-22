import { getAssetDocs } from "../lib/firebase/client/db/getAssetDocs"
import { useEffect, useState } from "react"
import { Asset } from "../models/Asset"
import { usePrevious } from "./usePrevious"

export interface AssetsObject {
  [symbol: string]: Asset
}

export const useAssetData = (assets: string[]): AssetsObject => {
  // const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<AssetsObject>({})
  const prevAssets = usePrevious(assets)

  useEffect(() => {
    const getAssetData = async () => {
      let filtered = assets

      if (assets?.length) {
        if (data) filtered = assets?.filter((asset) => !(asset in data))

        const assetData = (await getAssetDocs(filtered))?.map((doc) => doc.data())

        if (JSON.stringify(assets) !== JSON.stringify(prevAssets)) {
          setData((prev) =>
            assetData?.reduce(
              (acc, doc) => ({ ...acc, [doc.alpaca.symbol]: doc }),
              prev
            )
          )
        }
      }
    }
    getAssetData()
  }, [assets, prevAssets])

  // useEffect(() => setMounted(true), [])

  return data
}
