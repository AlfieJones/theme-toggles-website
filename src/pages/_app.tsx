import "../styles/globals.css"
import "@theme-toggles/react/dist/css/bundle.css"
import "../styles/prism-one.css";
import React, { FC, Fragment } from "react"
import { ThemeProvider } from "next-use-theme"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { H1, H2, H3, H4, H5, H6, P } from "../components/mdx"
import { MDXProvider } from "@mdx-js/react"
import { MDXComponents } from "mdx/types"
import { Code } from "../components"

type NextPageWithLayout = NextPage & {
  PrimaryLayout?: FC
  SecondaryLayout?: FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  code: Code,
  pre: Fragment
} as MDXComponents

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const PrimaryLayout = Component.PrimaryLayout || Fragment
  const SecondaryLayout = Component.SecondaryLayout || Fragment
  return (
    <ThemeProvider>
      <MDXProvider components={components}>
      <PrimaryLayout>
        <SecondaryLayout>
          <Component {...pageProps} />
        </SecondaryLayout>
      </PrimaryLayout>
      </MDXProvider>
    </ThemeProvider>
  )
}
export default MyApp
