import { useRouter } from "next/router"
import React from "react"

export default function CryptoPair() {
  const router = useRouter()
  const { pair } = router.query
  return (
    <div className="flex items-center justify-center h-screen mx-auto text-5xl font-poppins text-brand">
      {`Crypto pair ${pair} coming soon ...ish`}
    </div>
  )
}
