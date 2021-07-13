import { authContext } from "@contexts/authContext"
import { useContext } from "react"

export const useAuth = () => useContext(authContext)
