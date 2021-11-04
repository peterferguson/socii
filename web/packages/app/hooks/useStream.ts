import { StreamContext } from "../contexts"
import { useContext } from "react"

export const useStream = () => useContext(StreamContext)
