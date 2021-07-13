import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import clsx from "clsx"
// @ts-ignore
import { vscDarkPlus } from "/node_modules/react-syntax-highlighter/dist/esm/styles/prism"
// @ts-ignore
import jsx from "/node_modules/react-syntax-highlighter/dist/esm/languages/prism/jsx"
import { generateCode, icons } from "../toggles/utilities"
import React, { Fragment, useEffect, useState } from "react"
import {
  CheckCircleIcon,
  CheckIcon,
  SelectorIcon,
  XIcon,
} from "@heroicons/react/solid"
import { ClipboardCopyIcon } from "@heroicons/react/solid"
import { Listbox, Transition } from "@headlessui/react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toggles } from "../toggles/data/meta"

const tabs = ["HTML", "JSX"]

const variants = ["Button", "Checkbox", "Div"]

SyntaxHighlighter.registerLanguage("jsx", jsx)

export default function Toggles({ code, toggle }: any) {
  const [activeTab, setActiveTab] = useState(tabs[0])
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
    console.log(container)
    switch (activeTab) {
      case "HTML":
        setActiveCode(container.html)
        break
      case "JSX":
        setActiveCode(container.jsx)
        break
      default:
        setActiveCode(container.html)
    }
  }, [selected, activeTab, code])

  console.log(toggle)

  return (
    <>
      <h1 className="ml-4 text-6xl font-bold text-gray-700 dark:text-white">
        Inner Moon
      </h1>
      <p className="mt-4 ml-4 text-2xl text-gray-500 dark:text-gray-400">
        Inspired by Google fonts toggle
      </p>
      <div className="flex flex-col items-center mt-12 md:items-start md:mt-24 md:flex-row">
        <div className="h-full px-6 mb-6 lg:px-12 md:mb-0 ">
          <div className="p-6 first-line:rounded-md">
            <label className="theme-toggle">
              <input type="checkbox" />
              <span className="sr-only">Toggle theme</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(
                  "w-56 py-5 lg:w-64 inner-moon",
                  toggle.classesToggle
                )}
                fill="currentColor"
                viewBox="0 0 472.39 472.39"
              >
                <g className="toggle-outer">
                  <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
                </g>
                <g className="toggle-inner">
                  <circle cx="236.2" cy="236.2" r="103.78" />
                </g>
              </svg>
            </label>
          </div>
        </div>
        <div className="w-full p-2 overflow-x-hidden rounded-md bg-dark-800">
          <div className="flex flex-wrap-reverse mx-2 border-b border-dark-50">
            <nav className="block pr-16 space-x-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    activeTab === tab
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300",
                    "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm"
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <div className="flex ml-auto">
              <Listbox value={selected} onChange={setSelected}>
                <Listbox.Label className="sr-only">HTML Element</Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative self-end min-w-[5.5rem] w-full py-2 pl-3 pr-10 text-left rounded-md shadow-sm bg-dark-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <span className="block truncate text-gray-50">
                      {selected}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-200"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-dark-400 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {variants.map((person) => (
                        <Listbox.Option
                          key={person}
                          className={({ active }) =>
                            clsx(
                              active
                                ? "text-gray-50 bg-dark-50"
                                : "text-gray-300",
                              "cursor-pointer select-none relative py-2 pl-3 pr-5"
                            )
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={clsx(
                                  selected
                                    ? "font-semibold text-gray-50"
                                    : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {person}
                              </span>

                              {selected ? (
                                <span
                                  className={clsx(
                                    "text-blue-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-2"
                                  )}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
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

export async function getStaticProps(context: {
  params: { [x: string]: string }
}) {
  const toggle = toggles.find((t) => t.svg === context.params["toggle-name"])
  return {
    props: {
      code: generateCode(icons[0]),
      toggle: toggle,
    },
  }
}

export async function getStaticPaths() {
  const result = toggles.map((t) => ({ params: { "toggle-name": t.svg } }))

  return {
    paths: result,
    fallback: false, // See the "fallback" section below
  }
}
