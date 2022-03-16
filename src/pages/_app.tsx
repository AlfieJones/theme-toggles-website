import "../styles/globals.css"
import "@theme-toggles/react/dist/css/bundle.css"
import "../styles/prism-one.css";
require('prismjs/components/prism-bash.min')
require('prismjs/components/prism-jsx.min')
import React, { FC, Fragment } from "react"
import { ThemeProvider } from "next-use-theme"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { BlockQuote, H1, H2, H3, H4, H5, H6, LI, OL, P } from "../components/mdx"
import { MDXProvider } from "@mdx-js/react"
import { MDXComponents } from "mdx/types"
import { CodeFormatter } from "../components"

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
  code: CodeFormatter,
  pre: Fragment,
  blockquote: BlockQuote,
  li: LI,
  ol: OL
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
