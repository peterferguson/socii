import React from "react"
import { useRouter } from "next/router"
import { useAuth } from "@hooks/useAuth"

interface IInvestButtonProps {
  state: any
  send: (event: string) => void
  logoColor: string
}

export const InvestButton: React.FC<IInvestButtonProps> = ({
  state,
  send,
  logoColor,
}) => {
  const router = useRouter()
  const { username } = useAuth()
  return (
    <div
      style={{ backgroundColor: logoColor }}
      className="mx-0 mt-2 mb-0 text-center btn btn-transition rounded-2xl sm:rounded-xl"
      onClick={() =>
        username
          ? state.matches("active")
            ? send("CLOSE")
            : send("CLICK")
          : router.push("/enter")
      }
    >
      <span className="z-10 w-12 h-4 text-4xl">Invest</span>
    </div>
  )
}
