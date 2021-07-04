import Link from "next/link"
import React from "react"

export default function Logo({ className }) {
  return (
    <>
      <Link href="/">
        <a className={`${className} font-primary inline-flex`}>
          soc
          <p
            className={`${className} bg-clip-text text-transparent \
          bg-gradient-to-r from-green-400 to-brand font-primary`}
          >
            ii
          </p>
        </a>
      </Link>
    </>
  )
}
