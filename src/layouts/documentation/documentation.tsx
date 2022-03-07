import clsx from "clsx"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import React, { FC } from "react"
import { DocumentationProps } from "./documentation.props"

const tabs = [
  { title: "HTML", key: 0, data: "/documentation" },
  { title: "React", key: 1, data: "/settings/password" },
]
const SettingsLayout: FC<DocumentationProps> = ({
  children,
}: DocumentationProps) => {
  const router = useRouter()

  return (
    <>
      <div className="pb-5 overflow-x-auto scrollbar">
        <nav className="flex space-x-5 border-b border-gray-200 dark:border-dark-50">
          {tabs.map((tab) => (
            <Link href={tab.data} key={tab.title} replace>
              <a
                className={clsx(
                  tab.data === router.pathname
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
      <div className="mt-5">{children}</div>
    </>
  )
}

export default SettingsLayout
