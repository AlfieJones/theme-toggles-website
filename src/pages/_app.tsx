import "../styles/globals.css"

import React from "react"
import type { AppProps } from "next/app"
import { Layout } from "../components"
import { ThemeProvider } from "next-theme"
import { AnimateSharedLayout } from "framer-motion"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <AnimateSharedLayout>
          <Component {...pageProps} />
        </AnimateSharedLayout>
      </Layout>
    </ThemeProvider>
  )
}
export default MyApp
