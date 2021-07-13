import { userContext } from "@contexts/authContext"
import { useContext } from "react"

export const useAuth = () => useContext(userContext)
