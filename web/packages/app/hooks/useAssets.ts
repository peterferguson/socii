import { AssetsContext } from "../contexts/AssetsContext"
import { useContext } from "react"

export const useAssets = () => useContext(AssetsContext)
