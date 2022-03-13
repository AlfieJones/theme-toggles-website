import React, { FC } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { TabProps } from "./tabs.props"

const Tabs: FC<TabProps> = ({ tabs, base, className, ...rest }: TabProps) => {
  const router = useRouter()
  return (
    <div
      className={clsx("pb-5 overflow-x-auto scrollbar", className)}
      {...rest}
    >
      <nav className="flex space-x-5 border-b border-gray-200 dark:border-dark-50">
        {tabs.map((tab) => (
          <Link href={`${base}${tab.pathname}`} key={tab.title} replace>
            <a
              className={clsx(
                `/${base}${tab.pathname}` === router.asPath ||
                  (tab.default && router.asPath === `/${base}`)
                  ? "border-blue-600 text-blue-500 dark:text-white"
                  : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-100",
                "whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
              )}
            >
              {tab.title}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Tabs
