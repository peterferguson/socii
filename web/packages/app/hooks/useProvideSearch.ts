import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useRef } from "react"
import { SearchContext } from "../contexts/SearchContext"

export const useProvideSearch = (): SearchContext => {
  const searchModalRef = useRef<BottomSheetModal>(null)
  return { searchModalRef }
}
