import { authContext } from "../contexts/AuthContext"
import { useContext } from "react"

export const useAuth = () => useContext(authContext)
