import "../styles/globals.css"
import "@theme-toggles/react/dist/css/bundle.css"

import React, { FC, Fragment } from "react"
import { ThemeProvider } from "next-use-theme"
import { NextPage } from "next"
import { AppProps } from "next/app"

type NextPageWithLayout = NextPage & {
  PrimaryLayout?: FC
  SecondaryLayout?: FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const PrimaryLayout = Component.PrimaryLayout || Fragment
  const SecondaryLayout = Component.SecondaryLayout || Fragment
  return (
    <ThemeProvider>
      <PrimaryLayout>
        <SecondaryLayout>
          <Component {...pageProps} />
        </SecondaryLayout>
      </PrimaryLayout>
    </ThemeProvider>
  )
}
export default MyApp
