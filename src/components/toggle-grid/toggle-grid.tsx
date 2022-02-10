import clsx from "clsx"
import Link from "next/link"
import React, { FC } from "react"
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser"

const preprocessNodes = (node: any) => {
  // do not render any <span> tags
  node[0].children[5].attribs = {
    ...node[0].children[5]?.attribs,
    class: `w-[75%] h-auto mx-auto py-5 text-gray-900`,
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

const ToggleGrid: FC<{ toggles: any }> = ({ toggles }: any) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 justify-items-center xs:justify-items-stretch gap-x-8 gap-y-8 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {toggles.map((item: any) => (
        <li
          key={item.name}
          className="relative w-full max-w-[17rem] rounded-md hover:scale-105 transition-transform shadow-md dark:shadow-lg-strong"
        >
          <div className={clsx("rounded-t-md ", item.classesGrid)}>
            <label className="theme-toggle">
              <input type="checkbox" />
              <span className="sr-only">Toggle theme</span>
              {ReactHtmlParser(item.code, {
                preprocessNodes: preprocessNodes,
                transform: transformFn,
              })}
            </label>
          </div>
          <Link href={`/${item.svg}`}>
            <a>
              <div className="p-2 dark:bg-dark-850 rounded-b-md">
                <h3 className="block text-xl font-bold text-gray-700 truncate dark:text-gray-100">
                  {item.name}
                </h3>
                <p className="block pt-1 pb-5 text-sm font-medium text-gray-500 dark:text-gray-300">
                  {item.description}
                </p>
                <p className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  See the code
                </p>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ToggleGrid
