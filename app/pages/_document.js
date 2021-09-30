import Document, { Head, Html, Main, NextScript } from "next/document"
import React from "react"
import { SplashScreens } from "../components/SplashScreens"
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" className="bg-gray-50 md:no-scrollbar">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00aba9" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="socii" />
          <meta name="application-name" content="socii" />
          <meta name="msapplication-TileColor" content="#010101" />
          {/* <!-- this sets the color of url bar  --> */}
          <meta name="theme-color" content="#F9FAFB" />
          {/* <!-- this sets the color of url bar on iOS --> */}
          {/* <!-- TODO: Need to add this for dark theme --> */}
          {/* <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          ></meta> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>

          {/* Fullscreen on iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>

          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
          <meta name="msapplication-TileImage" content="mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />


        </Head>
        {/* onTouchStart="" enables native hover and active properties for PWA */}
        <body onTouchStart="">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
