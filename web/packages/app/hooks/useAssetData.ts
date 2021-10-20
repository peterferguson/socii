import { getAssetDocs } from "../lib/firebase/client/db/getAssetDocs"
import { useEffect, useState } from "react"
import { Asset } from "../models/Asset"

export const useAssetData = (assets: string[]): { [asset: string]: Asset }[] => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getAssetData = async () => {
      const data = (await getAssetDocs(assets))?.map((doc) => doc.data())
      setData(data.map((doc) => ({ [doc.alpaca.asset]: doc })))
    }
    getAssetData()
  }, [assets])

  return data
}
