import { useAssetData } from "app/hooks/useAssetData"
import { AssetsContext } from "./AssetsContext"

export function AssetsProvider({ children, assetSymbols }) {
  const assets = useAssetData(assetSymbols)
  return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>
}
