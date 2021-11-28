import { StreamContext } from "../contexts/StreamContext"
import { useContext } from "react"

export const useStream = () => useContext(StreamContext)
