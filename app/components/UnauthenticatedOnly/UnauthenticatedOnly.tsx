import { useAuth } from "@hooks/useAuth"
import useInitialMount from "@hooks/useInitialMount"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface UnauthenticatedOnlyProps {
  children: JSX.Element
}

// - If user has a username (logged in), redirect to /stocks
export default function UnauthenticatedOnly({ children }: UnauthenticatedOnlyProps) {
  const { user } = useAuth()

  const router = useRouter()

  const isInitialMount = useInitialMount()

  useEffect(() => {
    isInitialMount && user?.username && router.push("/stocks")
  }, [isInitialMount, router, user?.username])

  return !user?.username ? children : null
}
