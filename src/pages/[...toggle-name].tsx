import clsx from "clsx"
import { CodeCollectionType, CodeType, generateCode, toggles } from "../toggles/utilities"
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser"
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid"
import { ClipboardCopyIcon } from "@heroicons/react/solid"
import { Switch, Transition } from "@headlessui/react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toggles as togglesMeta } from "../toggles/data/meta"
import Layout from "../layouts/main"
import ToggleLayout, { ToggleContext } from "../layouts/toggle/toggle"
import { GetStaticPaths, GetStaticProps } from "next"
import { Toggle } from "../layouts/toggle/toggle.props"
import { Code } from "../components"
import {NextSeo} from "next-seo"

const preprocessNodes = (classes: string) => (node: any) => {
  // do not render any <span> tags
  node[0].children[5].attribs = {
    ...node[0].children[5].attribs,
    class: `${node[0].children[5].attribs.class} w-56 py-5 lg:w-64 inner-moon ${classes}`,
  }
  return node
}

// Fixes issue where viewBox is viewbox
function transformFn(node: any) {
  if (node.name === "svg") {
    const { viewbox, ...rest } = node.attribs

    return (
      <svg {...rest} viewBox={viewbox}>
        {node.children.map((child: any, index: number) => {
          if (child.name === "path") {
            const { pathlength, ...rest } = child.attribs

            return (
              <path {...rest} pathLength={pathlength}>
                {child.children.map((child2: any, index: number) => {
                  return convertNodeToElement(child2, index, transformFn)
                })}
              </path>
            )
          }
          return convertNodeToElement(child, index, transformFn)
        })}
      </svg>
    )
  }

  if (node.name === "path") {
    const { pathlength, ...rest } = node.attribs

    return (
      <path {...rest} pathLength={pathlength}>
        {node.children.map((child: any, index: number) => {
          return convertNodeToElement(child, index, transformFn)
        })}
      </path>
    )
  }
}

interface ToggleProps { code: CodeCollectionType, toggle: Toggle }

const Toggles = ({ code, toggle }: ToggleProps) => {
  const [reversed, setReversed] = useState(false)

  const [selected, setSelected] = useState<CodeType | undefined>(code.variants[0])

  const setToggle = useContext(ToggleContext)

  useEffect(() => {
    setSelected(code.variants[0])
  }, [code.variants])

  useEffect(() => {
    setToggle && setToggle(toggle)
  }, [setToggle, toggle])

  const [show, setShow] = useState(false)
  
  const display = useMemo(
    () =>
      ReactHtmlParser(code.display.code, {
        preprocessNodes: preprocessNodes(toggle.classesToggle || ""),
        transform: transformFn,
      }),
    [code.display.code, toggle.classesToggle]
  )

  const displayReversed = useMemo(
    () =>
      ReactHtmlParser(code.display.reversed, {
        preprocessNodes: preprocessNodes(toggle.classesToggle || ""),
        transform: transformFn,
      }),
    [code.display.reversed, toggle.classesToggle]
  )

  return (
    <>
    <NextSeo
    title={toggle.name}
    description="See the toggle in action and get the code"
  />
      <div className="flex flex-col items-center mt-12 md:items-start md:mt-24 md:flex-row">
        <div className="h-full px-6 mb-6 lg:px-12 md:mb-0 ">
          <div className="p-6 first-line:rounded-md ">
            {reversed ? displayReversed : display}
          </div>
        </div>
        <div className="w-full p-2 overflow-x-hidden rounded-md bg-zinc-100 dark:bg-dark-800">
          <div className="flex flex-wrap-reverse mx-2 overflow-auto border-b dark:border-dark-50 border-zinc-300">
            <div className="flex pr-16 space-x-2" aria-label="Wrapper">
              {code.variants.length > 1 &&
                code.variants.map((variant: any) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() =>
                      setSelected(
                        code.variants.find((i: any) => i.name === variant.name)
                      )
                    }
                    className={clsx(
                      selected?.name === variant.name
                        ? "dark:border-blue-500 dark:text-blue-500 border-blue-600 text-blue-600"
                        : "border-transparent text-zinc-500 dark:hover:text-zinc-200 hover:text-zinc-600 hover:border-zinc-300",
                      "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                    )}
                  >
                    {variant.name}
                  </button>
                ))}
            </div>
            <div className="flex ml-auto">
              <Switch.Group as="div" className="flex items-center">
                <Switch.Label
                  as="span"
                  className="mr-3 text-sm pointer-events-none dark:text-zinc-200 text-zinc-700"
                >
                  Reverse
                </Switch.Label>
                <Switch
                  checked={reversed}
                  onChange={setReversed}
                  className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-2 ring-offset-zinc-50 dark:ring-offset-dark-800 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Use reversed</span>
                  <span
                    aria-hidden="true"
                    className="absolute w-full h-full rounded-md pointer-events-none dark:bg-dark-800 bg-zinc-100"
                  />
                  <span
                    aria-hidden="true"
                    className={clsx(
                      reversed ? "bg-blue-600" : "dark:bg-dark-50 bg-zinc-200",
                      "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={clsx(
                      reversed ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-zinc-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <CopyToClipboard
                text={selected?.code || ""}
                onCopy={() => {
                  setShow(true)
                  setTimeout(() => setShow(false), 4000)
                }}
              >
                <button type="button" className="ml-5 mr-2">
                  <ClipboardCopyIcon
                    className="w-6 h-6 my-2 dark:text-white text-zinc-500"
                    aria-hidden="true"
                  />
                </button>
              </CopyToClipboard>
            </div>
          </div>
            <Code className={`language-${selected?.type}`} >{reversed ? selected?.reversed : selected?.code}</Code>
        </div>
      </div>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transform ease-out duration-300 transition"
            leaveFrom="translate-y-0 opacity-100 sm:translate-x-0"
            leaveTo="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          >
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto dark:bg-dark-400 ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="w-6 h-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      Code copied!
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex rounded-md text-zinc-400 dark:text-zinc-200 hover:text-zinc-500 focus:outline-none dark:ring-offset-dark-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

Toggles.PrimaryLayout = Layout
Toggles.SecondaryLayout = ToggleLayout

export const getStaticProps: GetStaticProps = async (context) => {
  const toggleMeta = togglesMeta.find(
    //@ts-ignore
    (t) => t.svg === context.params["toggle-name"][0]
  )
  const toggle = toggles.find(
    (toggle: Toggle) => toggle.name === toggleMeta?.svg
  )

  // @ts-ignore
  const framework = context.params["toggle-name"][1] || "html"

  return {
    props: {
      code: generateCode(toggle, framework as any),
      toggle: toggleMeta,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const results = togglesMeta.reduce((prev: any[], curr) => {
    const value = [
      {
        params: {
          "toggle-name": [curr.svg, ""],
        },
      },
      {
        params: {
          "toggle-name": [curr.svg, "react"],
        },
      },
      {
        params: {
          "toggle-name": [curr.svg, "html"],
        },
      },
    ]
    prev.push(...value)
    return prev
  }, [])

  return {
    paths: results,
    fallback: false, // See the "fallback" section below
  }
}

export default Toggles
