import { useAssetData } from "@hooks/useAssetData"
import { AssetsContext } from "./AssetsContext"

export function AuthProvider({ children, assetSymbols }) {
  const assets = useAssetData(assetSymbols)
  return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>
}
