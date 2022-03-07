import "../styles/globals.css"
import "@theme-toggles/react/dist/css/bundle.css"

import React from "react"
import type { AppProps } from "next/app"
import { Layout } from "../components"
import { ThemeProvider } from "next-use-theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
export default MyApp
