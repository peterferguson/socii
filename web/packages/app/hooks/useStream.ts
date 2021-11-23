import { streamContext } from "../contexts/StreamContext"
import { useContext } from "react"

export const useStream = () => useContext(streamContext)
