import { useAuth } from "@hooks/useAuth"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface UnauthenticatedOnlyProps {
  children: JSX.Element
}

export default function UnauthenticatedOnly({ children }: UnauthenticatedOnlyProps) {
  const { username } = useAuth()
  const router = useRouter()

  useEffect(() => {
    !username && router.push("/stocks")
  }, [router, username])

  return !username ? children : null
}
