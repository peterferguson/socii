import NextHead from "next/head"
import { string } from "prop-types"
import React from "react"

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
}

const defaultDescription = "Invest with Friends!"
const defaultOGURL = ""
const defaultOGImage = ""

export default function Head(props) {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || "socii"}</title>
      <meta name="description" content={props.description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ""} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* No zoom and flow into notch */}
      <meta
        name="viewport"
        content="initial-scale=1, viewport-fit=cover, width=device-width, maximum-scale=1, user-scalable=no"
      />
      {process.env.NODE_ENV === "production" && (
        <script
          async
          defer
          data-website-id="c59a2266-173b-482e-95cd-e15432f036a5"
          src="https://metrics.socii.app/umami.js"
        />
      )}
    </NextHead>
  )
}
