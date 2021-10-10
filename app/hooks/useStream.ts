/// <reference path="./stream.d.ts" /
import { streamContext } from "@contexts/streamContext"
import { Stream } from "@models/Stream"
import { useContext } from "react"

export const useStream = () => useContext(streamContext) as Stream
