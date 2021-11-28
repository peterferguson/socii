import { createContext } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

export interface SearchContext {
  searchModalRef: React.MutableRefObject<BottomSheetModal>
}

export const SearchContext = createContext({} as SearchContext)
