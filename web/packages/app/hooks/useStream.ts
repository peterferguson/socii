import { streamContext } from "../contexts/streamContext"
import { useContext } from "react"

export const useStream = () => useContext(streamContext)
