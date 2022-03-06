/* eslint-disable @next/next/no-page-custom-font */
import { Html, Head, Main, NextScript } from "next/document"
import { ThemeScript } from "next-use-theme"

const Document = () => {
  return (
    <Html>
      <Head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/theme-toggles@2.0.0/build/bundle.min.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
