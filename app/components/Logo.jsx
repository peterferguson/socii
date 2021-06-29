import Link from "next/link"
import React from "react"

export default function Logo({ className }) {
  return (
    <>
      <Link href="/">
        <a className={`${className} font-poppins`}>soc</a>
      </Link>
      <Link href="/">
        <a
          className={`${className} bg-clip-text text-transparent \
                       bg-gradient-to-r from-green-400 to-brand font-poppins`}
        >
          ii
        </a>
      </Link>
    </>
  )
}
