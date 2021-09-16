import { useAuth } from "@hooks/useAuth"
import { useRouter } from "next/router"
import React from "react"

interface IInvestButtonProps {
  send: (event: string) => void
  logoColor: string
}

export const InvestButton: React.FC<IInvestButtonProps> = ({ send, logoColor }) => {
  const router = useRouter()
  const { user } = useAuth()
  const username = user ? user.username : ""

  // TODO: On user not logged in show login modal instead of redirecting to login page
  return (
    <div
      style={{ backgroundColor: logoColor }}
      className="mx-0 mt-2 mb-0 text-center btn btn-transition rounded-2xl sm:rounded-xl"
      onClick={() => (username ? send("CLICK") : router.push("/enter"))}
    >
      <span className="z-10 w-12 h-4 text-4xl">Invest</span>
    </div>
  )
}
