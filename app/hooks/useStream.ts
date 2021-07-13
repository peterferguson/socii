import { streamContext } from "@contexts/streamContext"
import { useContext } from "react"

export const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export const useStream = () => useContext(streamContext)
