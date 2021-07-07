import Link from "next/link"
import React from "react"

export default function Logo({ className }) {
  return (
    <>
      <Link href="/">
        <a className={`${className} font-primary inline-flex`}>
          soc
          <span
            className={`${className} bg-clip-text text-transparent \
          bg-gradient-to-r from-green-400 to-brand font-primary`}
          >
            ii
          </span>
        </a>
      </Link>
    </>
  )
}
