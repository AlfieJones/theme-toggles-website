import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import clsx from "clsx"
// @ts-ignore
import { vscDarkPlus } from "./../../node_modules/react-syntax-highlighter/dist/esm/styles/prism"
// @ts-ignore
import jsx from "./../../node_modules/react-syntax-highlighter/dist/esm/languages/prism/jsx"
import { generateCode, toggles } from "../toggles/utilities"
import React, { Fragment, useEffect, useState } from "react"
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser"
import {
  CheckCircleIcon,
  CheckIcon,
  SelectorIcon,
  XIcon,
} from "@heroicons/react/solid"
import { ClipboardCopyIcon } from "@heroicons/react/solid"
import { Listbox, Switch, Transition } from "@headlessui/react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toggles as togglesMeta } from "../toggles/data/meta"
import Layout from "../layouts/main"

const tabs = ["HTML", "JSX"]

const variants = ["Button", "Checkbox", "Div"]

SyntaxHighlighter.registerLanguage("jsx", jsx)

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

export default function Toggles({ code, toggle }: any) {
  const [reversed, setReversed] = useState(false)
  const [selected, setSelected] = useState(variants[0])
  const [activeCode, setActiveCode] = useState(code.button.html)

  const [show, setShow] = useState(false)

  useEffect(() => {
    let container
    switch (selected) {
      case "Button":
        container = code.button
        break
      case "Checkbox":
        container = code.checkbox
        break
      case "Div":
        container = code.div
        break
      default:
        container = code.button
    }
    setActiveCode(container.html)
  }, [selected, code])

  return (
    <>
      <h1 className="ml-4 text-6xl font-bold text-gray-700 dark:text-white">
        {toggle.name}
      </h1>
      <p className="mt-4 ml-4 text-2xl text-gray-500 dark:text-gray-400">
        {toggle.description}
      </p>
      <div className="flex flex-col items-center mt-12 md:items-start md:mt-24 md:flex-row">
        <div className="h-full px-6 mb-6 lg:px-12 md:mb-0 ">
          <div className="p-6 first-line:rounded-md">
            {ReactHtmlParser(code.checkbox.html, {
              preprocessNodes: preprocessNodes(toggle.classesToggle),
              transform: transformFn,
            })}
          </div>
        </div>
        <div className="w-full p-2 overflow-x-hidden rounded-md bg-dark-800">
          <div className="flex flex-wrap-reverse mx-2 overflow-auto border-b border-dark-50">
            <nav className="flex pr-16 space-x-2" aria-label="Tabs">
              {variants.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelected(tab)}
                  className={clsx(
                    selected === tab
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300",
                    "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <div className="flex ml-auto">
              <Switch.Group as="div" className="flex items-center">
                <Switch.Label
                  as="span"
                  className="mr-3 text-sm text-gray-200 pointer-events-none"
                >
                  Reverse
                </Switch.Label>
                <Switch
                  checked={reversed}
                  onChange={setReversed}
                  className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 rounded-full cursor-pointer group focus:outline-none focus:ring-2 ring-offset-dark-800 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className="absolute w-full h-full rounded-md pointer-events-none bg-dark-800"
                  />
                  <span
                    aria-hidden="true"
                    className={clsx(
                      reversed ? "bg-blue-600" : "bg-dark-50",
                      "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={clsx(
                      reversed ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <CopyToClipboard
                text={activeCode}
                onCopy={() => {
                  setShow(true)
                  setTimeout(() => setShow(false), 4000)
                }}
              >
                <button type="button" className="ml-5 mr-2">
                  <ClipboardCopyIcon
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-dark-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <SyntaxHighlighter
              language="jsx"
              style={vscDarkPlus}
              customStyle={{
                padding: "1em 1em 2em",
                margin: "none",
                width: "fit-content",
              }}
            >
              {activeCode}
            </SyntaxHighlighter>
          </div>
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
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      Code copied!
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 rounded-md dark:text-gray-200 hover:text-gray-500 focus:outline-none dark:ring-offset-dark-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export async function getStaticProps(context: {
  params: { [x: string]: string }
}) {
  const toggleMeta = togglesMeta.find(
    (t) => t.svg === context.params["toggle-name"]
  )
  const toggle = toggles.find(
    (toggle: { name: string }) => toggle.name === toggleMeta?.svg
  )
  return {
    props: {
      code: generateCode(toggle),
      toggle: toggleMeta,
    },
  }
}

export async function getStaticPaths() {
  const result = togglesMeta.map((t) => ({ params: { "toggle-name": t.svg } }))
  return {
    paths: result,
    fallback: false, // See the "fallback" section below
  }
}
