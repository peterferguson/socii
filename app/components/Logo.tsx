import Link from "next/link"
import React from "react"

interface ILogo {
  className?: string
}

export default function Logo({ className }: ILogo) {
  return (
    <>
      <Link href="/">
        <a className={`${className ?? ""} font-primary inline-flex`}>
          soc
          <span
            className={`${className ?? ""} bg-clip-text text-transparent \
          bg-gradient-to-r from-green-400 to-brand font-primary`}
          >
            ii
          </span>
        </a>
      </Link>
    </>
  )
}
