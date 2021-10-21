import { getAssetDocs } from "../lib/firebase/client/db/getAssetDocs"
import { useEffect, useState } from "react"
import { Asset } from "../models/Asset"

export interface AssetsObject {
  [symbol: string]: Asset
}

export const useAssetData = (assets: string[]): AssetsObject => {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<AssetsObject>({})

  useEffect(() => console.log("useAssetData", assets?.length), [assets])
  useEffect(
    () =>
      console.log("useAssetData", assets?.filter((asset) => !(asset in data)).length),
    [assets]
  )
  useEffect(() => console.log("mounted", mounted), [mounted])

  useEffect(() => {
    const getAssetData = async () => {
      const assetData = (
        await getAssetDocs(assets.filter((asset) => !(asset in data)))
      )?.map((doc) => doc.data())
      setData((prev) =>
        assetData?.reduce((acc, doc) => ({ ...acc, [doc.alpaca.symbol]: doc }), prev)
      )
    }
    mounted && getAssetData()
    return () => setMounted(false)
  }, [assets])

  useEffect(() => setMounted(true), [])

  return data
}
