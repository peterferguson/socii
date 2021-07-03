import Link from "next/link"
import React from "react"
export default function OutlineButton({ href, text, className }) {
  return (
    <Link href={href}>
      <a
        className={`bg-transparent mr-auto hover:bg-brand-lightTeal text-brand hover:text-brand-shade-dark rounded shadow hover:shadow-lg py-2 px-4 border border-brand hover:border-transparent ${className}`}
      >
        {text}
      </a>
    </Link>
  )
}
