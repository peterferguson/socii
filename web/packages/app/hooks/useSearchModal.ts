import { useModal } from "./useModal"
import { useSearch } from "./useSearch"

export const useSearchModal = () => {
  const { searchModalRef } = useSearch()
  return useModal(searchModalRef)
}
