import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html
        lang="en"
        className="w-full h-full max-h-full overflow-x-hidden max-w-screen bg-gray-50 md:no-scrollbar"
      >
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins&family=Work+Sans:ital,wght@0,200;0,400;0,500;0,600;0,700;1,200;1,400&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="public/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="public/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="public/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="public/manifest.json" />
          <link
            rel="mask-icon"
            href="public/safari-pinned-tab.svg"
            color="#00aba9"
          />
          <meta name="apple-mobile-web-app-title" content="socii" />
          <meta name="application-name" content="socii" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          {/* <!-- this sets the color of url bar  --> */}
          <meta name="theme-color" content="#3fbaeb" />
          {/* <meta name="theme-color" content="#ffffff" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
