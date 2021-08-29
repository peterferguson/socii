import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react"
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="bg-gray-50 md:no-scrollbar">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00aba9" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="socii" />
          <meta name="application-name" content="socii" />
          <meta name="msapplication-TileColor" content="#010101" />
          {/* <!-- this sets the color of url bar  --> */}
          <meta name="theme-color" content="#F9FAFB" />
          {/* <!-- this sets the color of url bar on iOS --> */}
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          ></meta>

          {/* Fullscreen on iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
