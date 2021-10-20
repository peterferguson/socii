import { getAssetDocs } from "../lib/firebase/client/db/getAssetDocs"
import { useEffect, useState } from "react"
import { Asset } from "../models/Asset"

export const useAssetData = (assets: string[]): { [symbol: string]: Asset }[] => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getAssetData = async () => {
      const data = (await getAssetDocs(assets))?.map((doc) => doc.data())
      setData(data.map((doc) => ({ [doc.alpaca.symbol]: doc })))
    }
    getAssetData()
  }, [assets])

  return data
}
