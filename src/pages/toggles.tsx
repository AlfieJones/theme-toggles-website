import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import clsx from "clsx"
// @ts-ignore
import { vscDarkPlus } from "/node_modules/react-syntax-highlighter/dist/esm/styles/prism"
// @ts-ignore
import jsx from "/node_modules/react-syntax-highlighter/dist/esm/languages/prism/jsx"
import Button from "../toggles/varients/button"
import { copyIcon, icons } from "../toggles/utilities"
import prettier from "prettier/standalone"
import parser from "prettier/parser-typescript"
import Checkbox from "../toggles/varients/checkbox"
import { useState } from "react"

const tabs = ["HTML", "JSX"]

SyntaxHighlighter.registerLanguage("jsx", jsx)

export default function Toggles() {
  const [activeTab, setActiveTab] = useState(tabs[0])
  return (
    <>
      <h1 className="text-5xl font-bold text-gray-700 dark:text-white">
        Inner Moon
      </h1>
      <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
        Inspired by Google fonts toggle
      </p>
      <div className="flex items-center">
        <div className="">
          <label className="theme-toggle">
            <input type="checkbox" />
            <span className="sr-only">Toggle theme</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto py-5 text-gray-900 dark:text-gray-50 inner-moon"
              width="472.39"
              height="472.39"
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
        <div className="overflow-x-auto ">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={activeTab}
              >
                {tabs.map((tab) => (
                  <option key={tab}>{tab}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                    className={clsx(
                      tab === activeTab
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:text-gray-700",
                      "px-3 py-2 font-medium text-sm rounded-md"
                    )}
                    aria-current={tab === activeTab ? "page" : undefined}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          {activeTab === "JSX" && (
            <SyntaxHighlighter
              language="jsx"
              style={vscDarkPlus}
              customStyle={{ borderRadius: "0.375rem" }}
            >
              {prettier
                .format(copyIcon(icons[0], "jsx", Button), {
                  semi: false,
                  parser: "typescript",
                  plugins: [parser],
                })
                .replace(";", "")}
            </SyntaxHighlighter>
          )}
          {activeTab === "HTML" && (
            <SyntaxHighlighter
              language="jsx"
              style={vscDarkPlus}
              customStyle={{ borderRadius: "0.375rem" }}
            >
              {prettier
                .format(copyIcon(icons[0], "html", Button), {
                  semi: false,
                  parser: "typescript",
                  plugins: [parser],
                })
                .replace(";", "")}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </>
  )
}
