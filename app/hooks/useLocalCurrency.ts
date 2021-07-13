import { usePersistentState } from "./usePersistentState";


export const useLocalCurrency = () => usePersistentState("GBP", "localCurrency", true);
