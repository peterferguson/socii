import { Stream } from "@models/Stream"
import { createContext } from "react"

export const streamContext = createContext({ client: null } as Stream)
